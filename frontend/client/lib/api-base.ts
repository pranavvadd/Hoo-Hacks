const fallbackProdApiBase = "https://hoo-hacks.onrender.com";
const rawApiBase = (
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? fallbackProdApiBase : "")
).trim();
const rawWsBase = (import.meta.env.VITE_WS_BASE_URL || "").trim();

const apiBase = rawApiBase.replace(/\/+$/, "");

function deriveWsBaseFromApi(base: string): string {
  if (!base) return "";
  if (base.startsWith("https://")) return `wss://${base.slice("https://".length)}`;
  if (base.startsWith("http://")) return `ws://${base.slice("http://".length)}`;
  return "";
}

const wsBase = (rawWsBase || deriveWsBaseFromApi(apiBase)).replace(/\/+$/, "");

export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${apiBase}${normalized}`;
}

export function wsUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (wsBase) {
    return `${wsBase}${normalized}`;
  }

  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${wsProtocol}//${window.location.host}${normalized}`;
}
