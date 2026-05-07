const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "jpg", "jpeg", "png", "webp", "heic"]);
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/octet-stream",
]);

const encoder = new TextEncoder();
const signingKeys = new Map();

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store",
    },
  });
}

function base64url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function getExtension(filename) {
  const parts = String(filename || "").toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() : "";
}

function sanitizeFilename(filename) {
  const original = String(filename || "documento").split(/[\\/]/).pop() || "documento";
  const normalized = typeof original.normalize === "function" ? original.normalize("NFKD") : original;
  const cleaned = normalized
    .replace(/[^\w.\- ]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || "documento";
}

function formatContentDisposition(filename) {
  const fallback = sanitizeFilename(filename).replace(/"/g, "");
  const utf8 = encodeURIComponent(String(filename || fallback))
    .replace(/['()]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)
    .replace(/\*/g, "%2A");
  return `attachment; filename="${fallback}"; filename*=UTF-8''${utf8}`;
}

function getMimeType(extension) {
  switch (extension) {
    case "pdf":
      return "application/pdf";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heic":
      return "image/heic";
    default:
      return "application/octet-stream";
  }
}

async function getSigningKey(secret) {
  if (!signingKeys.has(secret)) {
    signingKeys.set(
      secret,
      crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      ),
    );
  }
  return signingKeys.get(secret);
}

async function signValue(secret, value) {
  const key = await getSigningKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return base64url(new Uint8Array(signature));
}

function getUploadSecret(env) {
  if (!env.UPLOAD_LINK_SECRET) {
    throw new Error("UPLOAD_LINK_SECRET non configurato");
  }
  return env.UPLOAD_LINK_SECRET;
}

async function buildAdminUrl(request, env, key) {
  const signature = await signValue(getUploadSecret(env), key);
  const origin = new URL(request.url).origin;
  return `${origin}/api/uploads/${encodeURIComponent(key)}?sig=${encodeURIComponent(signature)}`;
}

async function tryBuildAdminUrl(request, env, key) {
  try {
    return await buildAdminUrl(request, env, key);
  } catch {
    return null;
  }
}

async function handleUpload(request, env) {
  if (!env.UPLOADS) {
    return json({ ok: false, error: "Binding R2 UPLOADS non configurato." }, 500);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, error: "Body upload non valido." }, 400);
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return json({ ok: false, error: "Nessun file ricevuto." }, 400);
  }

  const extension = getExtension(file.name);
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return json({ ok: false, error: "Formato file non supportato." }, 400);
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    return json({ ok: false, error: "Ogni file deve essere al massimo di 10 MB." }, 413);
  }

  if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
    return json({ ok: false, error: "Tipo MIME non consentito." }, 400);
  }

  const kind = String(formData.get("kind") || "documenti")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "") || "documenti";
  const safeName = sanitizeFilename(file.name);
  const now = new Date();
  const year = String(now.getUTCFullYear());
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const key = `lead-docs/${kind}/${year}/${month}/${crypto.randomUUID()}-${safeName}`;
  const contentType = file.type || getMimeType(extension);

  try {
    await env.UPLOADS.put(key, file.stream(), {
      httpMetadata: {
        contentType,
        contentDisposition: formatContentDisposition(file.name),
      },
      customMetadata: {
        originalName: file.name,
        formKind: kind,
        uploadedAt: now.toISOString(),
        recipient: "quarkteam00@gmail.com",
      },
    });
  } catch (error) {
    return json(
      {
        ok: false,
        error: `Upload fallito: ${error instanceof Error ? error.message : "errore sconosciuto"}`,
      },
      500,
    );
  }

  return json({
    ok: true,
    key,
    name: file.name,
    size: file.size,
    adminUrl: await tryBuildAdminUrl(request, env, key),
  });
}

async function handleDownload(request, env, key) {
  if (!env.UPLOADS) {
    return new Response("Binding R2 UPLOADS non configurato.", { status: 500 });
  }

  const url = new URL(request.url);
  const signature = url.searchParams.get("sig");
  if (!signature) {
    return new Response("Forbidden", { status: 403 });
  }

  let expected;
  try {
    expected = await signValue(getUploadSecret(env), key);
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Secret non configurato.", { status: 500 });
  }

  if (signature !== expected) {
    return new Response("Forbidden", { status: 403 });
  }

  const object = await env.UPLOADS.get(key);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  if (typeof object.writeHttpMetadata === "function") {
    object.writeHttpMetadata(headers);
  }
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "private, no-store, max-age=0");
  headers.set("x-content-type-options", "nosniff");

  const originalName = object.customMetadata?.originalName || key.split("/").pop() || "documento";
  headers.set("content-disposition", formatContentDisposition(originalName));

  return new Response(object.body, {
    status: 200,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/uploads" && request.method === "POST") {
      return handleUpload(request, env);
    }

    if (url.pathname.startsWith("/api/uploads/") && request.method === "GET") {
      const key = decodeURIComponent(url.pathname.slice("/api/uploads/".length));
      return handleDownload(request, env, key);
    }

    return env.ASSETS.fetch(request);
  },
};
