const protoBuf = require("protocol-buffers");
const fs = require("fs");

const schemas = protoBuf(fs.readFileSync(`${__dirname}/detail.proto`));

modules.exports = {
  columnRequest: schemas.ColumnRequest,
  columnResponse: schemas.ColumnResponse
};
