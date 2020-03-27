import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get(
  "/",
  (req, res) => res.render("home", { events: JSON.stringify(events) })
  // 프론트에서도 events를 공유하기 위해서 입력
);

const handleListening = () =>
  console.log(`✅ Server running http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);
// socketIO는 server와 client가 동시에 될수 있다.

io.on("connection", socket => {
  socketController(socket, io);
});
