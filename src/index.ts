import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { router as httpGetInterface } from "@/routes/httpGetInterface";
import { router as httpPostInterface } from "@/routes/httpPostInterface";
import { listenPort } from "@/configs/listenPort";
// import { AppDataSource } from "@/resources/AppDataSource";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

/** 这里开始放路由和api接口 **/
app.use(httpGetInterface);
app.use(httpPostInterface);


/** SwaggerAPI文档 **/
const filebase_dir = path.dirname(__filename);
const swagger_file_dir = path.resolve(filebase_dir, "./statics/swagger/");
app.use("/docs", express.static(swagger_file_dir));
app.use("/docs/swagger.json", async (request, response) => {
  const dist_filename = path.resolve(filebase_dir, "./swagger_api.json");
  response.sendFile(dist_filename);
});


const server = app.listen(listenPort, "0.0.0.0", async () => {
  try {
    // await AppDataSource.initialize();
    console.log("address", server.address());
  } catch (error) {
    console.log(error);
    process.exit(0);
  };
});