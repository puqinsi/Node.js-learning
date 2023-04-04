// RPC 封装的抽象逻辑
function server(cb) {
  const req = { a: 1 };

  cb(req, res => {
    console.log(res.toString());
  });
}

server((req, resFn) => {
  const res = req.a + 1;
  resFn(res);
});
