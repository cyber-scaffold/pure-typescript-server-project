const path = require("path");
const webpack = require("webpack");
const spawn = require("cross-spawn");
const { EventEmitter } = require("events");

const server_webpack_config = require("./server/webpack.server.development");
const generate_swagger_docs = require("./utils/generate_swagger_docs");

(async () => {
  const process_list = [];
  const server_compiler = webpack(server_webpack_config);
  /** 处理编译完成的事件 **/
  const compiler_events = new EventEmitter();
  compiler_events.on("compiler_complate", () => {
    process_list.forEach((current_process) => { current_process.kill() });
    const current_process = spawn("node", [path.resolve(process.cwd(), "./dist/server.js")], { stdio: "inherit" });
    process_list.push(current_process);
  });
  /** watch服务端 **/
  server_compiler.watch({}, async (error, stats) => {
    if (error) {
      console.log(error);
    } else {
      console.log(stats.toString({ colors: true }));
      compiler_events.emit("compiler_complate");
    };
    await generate_swagger_docs();
  });
})();