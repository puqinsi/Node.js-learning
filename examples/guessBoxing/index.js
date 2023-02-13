const game = require("./gameEngine");

const { argv, stdin, exit } = process;
// const playerAction = argv[argv.length - 1];

let count = 0;
const limitNum = 3;
console.warn("请输入：石头 | 剪刀 | 布 开始游戏吧");
// 监听输入
stdin.on("data", e => {
  const playerAction = e.toString().trim();
  const { code, msg } = game(playerAction);
  if (code === -2) {
    console.log(msg);
  } else {
    console.log(`游戏结果：${msg}\n--------------------`);

    if (code === 1) count++;
    if (count === limitNum) {
      console.log("总是输，不玩了！");
      exit();
    }
  }
});
