const path = require("path");
const { writeFile } = require("jsonfile");
const swagger_jsdoc = require("swagger-jsdoc");

/** 生成Swagger文档相关的方法 **/
module.exports = async function generate_swagger_docs() {
  const dist_filename = path.resolve(process.cwd(), "./dist/swagger_api.json");
  const swagger_api_docs = swagger_jsdoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "SwaggerAPI文档",
        version: "1.0.0",
      },
    },
    apis: [path.resolve(process.cwd(), "./src/routes/**/*.ts")],
  });
  await writeFile(dist_filename, swagger_api_docs, { spaces: 2, EOL: "\r\n" });
};