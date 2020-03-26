import { handleNewUser } from "./notifications";

let socket = null;

export const getSocket = () => socket;

export const upadteSocket = aSocket => (socket = aSocket);

export const initSockets = aSocket => {
  const { events } = window;
  upadteSocket(aSocket);
  aSocket.on(events.newUser, handleNewUser);
};
