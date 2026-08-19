import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

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
    plugins: [react()],
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
