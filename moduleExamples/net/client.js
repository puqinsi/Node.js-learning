const net = require("net");

const socket = new net.Socket({});

socket.connect({
  host: "127.0.0.1",
  port: "4000"
});

const ids = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// seq 标记包序号
let seq = 0,
  id;
function request() {
  const buffer = Buffer.alloc(6);
  id = ids[Math.floor(Math.random() * ids.length)];
  buffer.writeInt16BE(seq);
  buffer.writeInt32BE(id, 2);
  socket.write(buffer);
  console.log("seq: " + seq, "id: " + id);
  seq++;
}

setInterval(() => {
  request();
}, 300);

socket.on("data", buffer => {
  const seqBuffer = buffer.slice(0, 2);
  const contentBuffer = buffer.slice(2);
  console.log(
    "seq: " + seqBuffer.readInt16BE(),
    "value: " + contentBuffer.toString()
  );
});
