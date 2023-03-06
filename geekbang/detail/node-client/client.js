const EasySock = require("easy_sock");
const { columnRequest, columnResponse } = require("../common/schema");

const easySock = new EasySock({
  ip: "127.0.0.1",
  port: 4000,
  timeout: 1000,
  keepAlive: true
});

// TODO Buffer 长度可以抽成常量
easySock.encode = (data, seq) => {
  const body = columnRequest.encode(data);
  const head = Buffer.alloc(8);
  head.writeInt32BE(seq);
  head.writeInt32BE(body.length, 4);

  return Buffer.concat([head, body]);
};

easySock.decode = function (buffer) {
  const seq = buffer.readUInt32BE();
  const body = buffer.slice(8);

  return {
    seq,
    result: columnResponse.decode(body)
  };
};

easySock.isReceiveComplete = function (buffer) {
  if (buffer.length < 8) {
    return 0;
  }
  const bodyLength = buffer.readInt32BE(4);

  if (buffer.length >= bodyLength + 8) {
    return bodyLength + 8;
  } else {
    return 0;
  }
};

module.exports = easySock;
