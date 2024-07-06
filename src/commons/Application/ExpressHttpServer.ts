import path from "path";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { injectable, inject } from "inversify";

import { ApplicationConfigManager } from "@/commons/Application/ApplicationConfigManager";
import { requestScopeMiddleware } from "@/interceptors/requestScopeMiddleware";

import { router as HttpGetRouter } from "@/controllers/HttpGetController";
import { router as HttpPostRouter } from "@/controllers/HttpPostController";

@injectable()
export class ExpressHttpServer {

  private app = express();

  private server: http.Server;

  private filebaseDirectory = path.dirname(__filename);

  constructor(
    @inject(ApplicationConfigManager) private readonly applicationConfigManager: ApplicationConfigManager,
  ) { }

  async bootstrap() {
    /** 注册中间件 **/
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    /** 注册请求级容器中间件 **/
    this.app.use(requestScopeMiddleware);
    /** 注册控制器 **/
    this.app.use(HttpGetRouter);
    this.app.use(HttpPostRouter);
    /** 启动swagger文档 **/
    const swagger_file_dir = path.resolve(this.filebaseDirectory, "./statics/swagger/");
    this.app.use("/docs", express.static(swagger_file_dir));
    this.app.use("/docs/swagger.json", async (request, response) => {
      const dist_filename = path.resolve(this.filebaseDirectory, "./swagger_api.json");
      response.sendFile(dist_filename);
    });
    /** 启动服务器监听端口 **/
    const { server } = this.applicationConfigManager.getRuntimeConfig();
    this.server = this.app.listen(server.port, async () => {
      try {
        console.log("address", this.server.address());
      } catch (error) {
        console.log(error);
        process.exit(0);
      };
    });
  };

};