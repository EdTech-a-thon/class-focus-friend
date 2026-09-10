import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Adds the Cloudflare Web Analytics beacon to built pages. CF_BEACON_TOKEN is
// set only on the production Vercel environment, so dev servers, local builds
// and preview deploys don't count visits.
function cloudflareAnalytics(token) {
  return {
    name: "cloudflare-analytics",
    apply: "build",
    transformIndexHtml() {
      if (!token) return [];
      return [
        {
          tag: "script",
          attrs: {
            defer: true,
            src: "https://static.cloudflareinsights.com/beacon.min.js",
            "data-cf-beacon": JSON.stringify({ token }),
          },
          injectTo: "body",
        },
      ];
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Teacher accounts live in PocketBase, which runs alongside the website.
  // Passing its requests through the website's own address means the sign-in
  // screen works from any device that can open the site.
  const pocketbase = env.POCKETBASE_LOCAL_URL || "http://127.0.0.1:8091";
  const proxy = {
    "/api": { target: pocketbase, changeOrigin: true },
    "/_": { target: pocketbase, changeOrigin: true },
  };

  return {
    plugins: [react(), cloudflareAnalytics(env.CF_BEACON_TOKEN)],
    server: {
      allowedHosts: [".exe.xyz", ".edtechathon.com"],
      proxy,
    },
    preview: {
      allowedHosts: [".exe.xyz", ".edtechathon.com"],
      proxy,
    },
  };
});
