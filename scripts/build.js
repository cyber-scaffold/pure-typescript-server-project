const webpack = require("webpack");

const server_webpack_config = require("./server/webpack.server.build");
const generate_swagger_docs = require("./utils/generate_swagger_docs");

(async () => {
  const server_compiler = webpack(server_webpack_config);
  /** watch服务端 **/
  server_compiler.run(async (error, stats) => {
    if (error) {
      console.log(error);
    } else {
      console.log(stats.toString({ colors: true }));
    };
    await generate_swagger_docs();
  });
})();