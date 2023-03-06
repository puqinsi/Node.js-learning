const RPC = require("./rpc-server");
// TODO 8 和 4 没理清楚
module.exports = function (protoBufRequestSchema, protoBufResponseSchema) {
  return new RPC({
    decodeRequest(buffer) {
      const seq = buffer.readInt32BE();
      const body = buffer.slice(8);

      return {
        seq,
        result: protoBufRequestSchema.decode(body)
      };
    },
    encodeResponse(data, seq) {
      const body = protoBufResponseSchema.encode(data);
      const head = Buffer.alloc(8);
      head.writeInt32BE(seq);
      head.writeInt32BE(body.length, 4);

      return Buffer.concat([head, body]);
    },
    isCompleteRequest(buffer) {
      const bodyLength = buffer.readInt32BE(4);

      return 8 + bodyLength;
    }
  });
};
