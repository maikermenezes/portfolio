import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { handleContact } from "./server/contact.js";

/** Serves POST /api/contact during `vite dev` / `vite preview`, mirroring api/contact.js. */
const contactApi = (env) => {
  const middleware = (req, res, next) => {
    if (req.url !== "/api/contact") return next();
    const send = (status, body) => {
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(body));
    };
    if (req.method !== "POST") return send(405, { ok: false, error: "method_not_allowed" });

    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 100_000) req.destroy();
    });
    req.on("end", async () => {
      let payload;
      try {
        payload = JSON.parse(raw || "{}");
      } catch {
        return send(400, { ok: false, error: "invalid_json" });
      }
      const { status, body } = await handleContact(payload, { env, ip: req.socket.remoteAddress });
      send(status, body);
    });
  };

  return {
    name: "contact-api",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all vars (not only VITE_-prefixed) for server-side use only — never exposed to the client bundle.
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return {
    plugins: [react(), contactApi(env)],
  };
});
