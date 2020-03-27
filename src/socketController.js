import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  // io를 이용하여 나를 포함한 모두에게 broadcast를 해줄수 있다.
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if (inProgress === false) {
      inProgress = true;
      const leader = chooseLeader;
      word = chooseWord;
      io.to(leader.id).emit(events.leaderNotif, { word });
      // 특정 사용자에게만 이벤트를 보내고 싶으면 io.to를 사용
      superBroadcast(events.gameStarted);
    }
  };
  const endGame = () => {
    inProgress = false;
  };
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
    if (sockets.length === 1) {
      startGame();
    }
  });

  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    // filter은 조건에 부합하는 것들만 남기는것
    if (sockets.length === 1) {
      endGame();
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) =>
    broadcast(events.newMsg, { message, nickname: socket.nickname })
  );
  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );
  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokedPath, { x, y, color });
  });

  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};

export default socketController;
