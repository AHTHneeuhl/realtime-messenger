import RedisStore from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import { createServer } from "http";
import { Redis } from "ioredis";
import { Server } from "socket.io";

dotenv.config();

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

const redisClient = new Redis();
app.use(helmet());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);
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
