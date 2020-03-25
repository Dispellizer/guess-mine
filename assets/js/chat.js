export function handleMessageNotofi(data) {
  const { message, nickname } = data;
  console.log(`${nickname} : ${message}`);
}
