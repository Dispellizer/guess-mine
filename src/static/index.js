// eslint-disable-next-line no-undef
const socket = io("/");
// 프론트에 접속하면 자동으로 연결하기 위해서 작성
socket.on("hello", () => console.log("Somebody joined"));
// hello는 서버에서 발생시킨 이벤트

setTimeout(() => {
  socket.emit("helloGuys");
}, 4000);
