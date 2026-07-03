export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({
        ok: true,
        app: "sp500-sector-heatmap",
        runtime: "cloudflare-workers",
        generatedAt: "2026-07-02",
      });
    }

    // Static assets are served automatically by Cloudflare. This fallback is useful
    // for local dev and any routes not matched by an asset.
    return env.ASSETS.fetch(request);
  },
};
