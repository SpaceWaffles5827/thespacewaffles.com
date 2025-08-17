/* eslint-disable */
const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const prisma = new PrismaClient();

async function main() {
  await app.prepare();
  const server = createServer((req, res) => handle(req, res));
  const io = new Server(server, {
    path: "/socket.io",
    cors: { origin: "*" }, // same-origin in docker, fine as-is
  });

  io.on("connection", (socket) => {
    // client sends {author, text}
    socket.on("chat:send", async (payload) => {
      const author = (payload?.author || "anon").toString().slice(0, 40);
      const text = (payload?.text || "").toString().slice(0, 400);
      if (!text.trim()) return;

      const msg = await prisma.message.create({
        data: { author, text },
      });
      io.emit("chat:new", msg); // broadcast
    });
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

  const shutdown = async () => {
    await prisma.$disconnect();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
