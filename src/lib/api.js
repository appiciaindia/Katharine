const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");
const API_ORIGIN = API_URL.replace(/\/api$/, "");

function readCookie(name) {
  if (typeof document === "undefined") return "";
  const entry = document.cookie.split("; ").find((cookie) => cookie.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : "";
}

async function requestCsrfCookie() {
  const response = await fetch(`${API_ORIGIN}/sanctum/csrf-cookie`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Could not initialize the secure session. Please try again.");
  }
}

export async function apiRequest(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const isMutation = !["GET", "HEAD", "OPTIONS"].includes(method);
  if (isMutation) await requestCsrfCookie();

  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");

  let body = options.body;
  if (body && !(body instanceof FormData) && typeof body !== "string") {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(body);
  }

  if (isMutation) {
    const csrfToken = readCookie("XSRF-TOKEN");
    if (csrfToken) headers.set("X-XSRF-TOKEN", csrfToken);
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      method,
      headers,
      body,
      credentials: "include",
      // Admin-edited content should be read fresh after saving. In particular,
      // listing pages must not keep an older browser-cached API response.
      ...(isMutation ? {} : { cache: options.cache ?? "no-store" }),
    });
  } catch {
    throw new Error("Could not reach the API. Make sure the Laravel server is running.");
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const firstValidationError = Object.values(payload.errors || {}).flat()[0];
    const error = new Error(firstValidationError || payload.message || "The request could not be completed.");
    error.status = response.status;
    error.errors = payload.errors || {};
    throw error;
  }

  return payload;
}
