const buffer1 = Buffer.from("puqinsi");
const buffer2 = Buffer.from([1, 2, 3]);

const buffer3 = Buffer.alloc(10);
console.log(buffer1, buffer2, buffer3);

// buffer2.writeInt8(12, 0);
// console.log(buffer2);
// buffer2.writeInt16BE(120, 0);
// console.log(buffer2);
// buffer2.writeInt16LE(120, 0);
// console.log(buffer2);

const fs = require("fs");
const protoBuf = require("protocol-buffers");
const schema = protoBuf(fs.readFileSync(__dirname + "/test.proto", "utf-8"));

const buffer = schema.Column.encode({ id: 1, name: "Node.js", price: 80 });
console.log(buffer);
console.log(schema.Column.decode(buffer));
