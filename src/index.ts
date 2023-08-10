import path from "path";
import express from "express";
import bodyParser from "body-parser";
// import { DataSource } from "typeorm";
import cookieParser from "cookie-parser";

import { router as get_information } from "@/routes/get_information";
import { listen_port } from "@/configs/listenPort";


const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

/** 这里开始放路由和api接口 **/
app.use(get_information);


/** SwaggerAPI文档 **/
const filebase_dir = path.dirname(__filename);
const swagger_file_dir = path.resolve(filebase_dir, "./statics/swagger/");
app.use("/docs", express.static(swagger_file_dir));
app.use("/docs/swagger.json", async (request, response) => {
  const dist_filename = path.resolve(filebase_dir, "./swagger_api.json");
  response.sendFile(dist_filename);
});


const server = app.listen(listen_port, "0.0.0.0", () => {
  console.log("address", server.address());
});