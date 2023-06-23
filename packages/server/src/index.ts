import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";

// routes
import authRouter from "./routes/authRouter";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRouter);

io.on("connect", (socket) => {});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
