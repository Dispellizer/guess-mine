import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 5000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`✅ Server running http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);
// socketIO는 server와 client가 동시에 될수 있다.

let sockets = [];
// 연결된 소켓 id를 보기위한 빈 배열

io.on("connection", socket => sockets.push(socket.id));
// 연결될때마다 sockets에 socket.id값을 push해준다

setInterval(() => console.log(sockets), 1000);
