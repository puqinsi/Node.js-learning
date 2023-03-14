/* 子进程 */
process.on("message", str => {
  console.log("child", str);
  process.send("HeHe");
});
