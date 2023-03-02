const net = require("net");

// socket 一般代表网络通路写入和取出的代理对象
const server = net.createServer(socket => {
  socket.on("data", buffer => {
    const seqBuffer = buffer.slice(0, 2);
    const id = buffer.readInt32BE(2);
    setTimeout(() => {
      const buffer = Buffer.concat([seqBuffer, Buffer.from(data[id])]);
      socket.write(buffer);
    }, Math.random() * 1000 + 300);
  });
});

server.listen(4000);

const data = {
  0: "00",
  1: "01",
  2: "02",
  3: "03",
  4: "04",
  5: "05",
  6: "06",
  7: "07",
  8: "08",
  9: "09"
};
