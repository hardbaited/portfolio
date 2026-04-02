import dotenv from 'dotenv';
dotenv.config();

console.log('[server] Environment loaded, starting app...');

async function loadApp() {
  const { app } = await import("./build/index.js");

  if (app?.listen) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`[server] Listening on port ${port}`);
    });
  }
}

loadApp().catch((err) => {
  console.error("[server] Failed to start app:", err);
  process.exit(1);
});
