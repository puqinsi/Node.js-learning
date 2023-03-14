/* 父进程 */
const cp = require("child_process");

const childProcess = cp.fork(`${__dirname}/child.js`);
childProcess.send("HaHa");
childProcess.on("message", str => {
  console.log("parent", str);
});
