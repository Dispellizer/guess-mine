import {
  hideControls,
  disableCanvas,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableChat } from "./chat";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname} : ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifis = text => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  setNotifis("");
  // disable canvas events
  disableCanvas();
  // disable the canavas controls
  hideControls();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = "";
  notifs.innerText = `You are the leader, paint : ${word}`;
};

export const handleGameEnd = () => {
  setNotifis("Game ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
};

export const handleGameStarting = () => {
  setNotifis("Game will start soon");
};
