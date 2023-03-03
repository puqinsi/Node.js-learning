const vm = require("vm");

const templateMap = {
  templateA: "`<h2>${include('templateB')}</h2>`",
  templateB: "`<p>aaaaaa</p>`"
};

const context = {
  include(name) {
    return templateMap[name]();
  },
  helper() {},
  _(markup) {
    if (!markup) return "";
    return String(markup)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/'/g, "&#39;")
      .replace(/"/g, "&quot;");
  }
};

/* 
为什么要把 templateMap 中每项 template 改成函数来调用？
因为用 vm.runInNewContext 编译当前 template 时，当前 template 引用的其他 template 可能还没编译完，会导致 include 的 template 不对。
所以把每个 template 改成函数形式，这样在函数调用时，可以保证 include 的 template 是编译好的，不会出现问题。

如果不用函数形式，需要在编译每个 template 时，保证其 include 的 template 已经编译完成。
*/
Object.keys(templateMap).forEach(key => {
  const temp = templateMap[key];
  templateMap[key] = vm.runInNewContext(`() => ${temp}`, context);
});

console.log(templateMap["templateA"]());
