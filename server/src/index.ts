import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hi");
});

io.on("connect", (socket) => {});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
