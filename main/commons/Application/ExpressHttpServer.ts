import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { injectable, inject } from "inversify";

import { IOCContainer } from "@/main/cores/IOCContainer";
import { ApplicationConfigManager } from "@/main/commons/Application/ApplicationConfigManager";

import { requestMiddleware } from "@/main/interceptors/requestMiddleware";

import { TestPostController } from "@/main/controllers/TestPostController";
import { TestGetController } from "@/main/controllers/TestGetController";

import { logger } from "@/main/utils/logger";

import type { Server } from "http";
import type { Express } from "express";

@injectable()
export class ExpressHttpServer {

  private serverInstance: Server;

  private expressInstance: Express = express();

  constructor (
    @inject(ApplicationConfigManager) private readonly $ApplicationConfigManager: ApplicationConfigManager,
    @inject(TestPostController) private readonly $TestPostController: TestPostController,
    @inject(TestGetController) private readonly $TestGetController: TestGetController
  ) { }

  /** 服务启动时执行的代码 **/
  public async bootstrap() {
    const { server } = await this.$ApplicationConfigManager.getRuntimeConfig();
    const { custmerStaticResourceDirectory, projectStaticResourceDirectory, swaggerResourceDirectory } = await this.$ApplicationConfigManager.getRuntimeConfig();
    /** 注册中间件 **/
    this.expressInstance.use(cookieParser());
    this.expressInstance.use(bodyParser.json());
    this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
    /** 注册项目中的自定义中间件 **/
    this.expressInstance.use(requestMiddleware);
    /** Swagger文档的资源目录 **/
    this.expressInstance.use("/swagger/", express.static(swaggerResourceDirectory, {
      maxAge: process.env.NODE_ENV === "development" ? -1 : (100 * 24 * 60 * 60)
    }));
    /** 组件中的静态文件 **/
    /** 先从用户自定义的静态资源文件夹开始搜索 **/
    this.expressInstance.use(express.static(custmerStaticResourceDirectory, {
      maxAge: process.env.NODE_ENV === "development" ? -1 : (100 * 24 * 60 * 60)
    }));
    /** 其余静态文件的资源目录,比如网站的icon文件等(为所有资源兜底,但是必须放在控制器之前) **/
    this.expressInstance.use(express.static(projectStaticResourceDirectory, {
      maxAge: process.env.NODE_ENV === "development" ? -1 : (100 * 24 * 60 * 60)
    }));
    /** 注册项目中的控制器 **/
    this.expressInstance.use(this.$TestPostController.getRouter());
    this.expressInstance.use(this.$TestGetController.getRouter());
    /** 启动服务器监听端口 **/
    this.serverInstance = this.expressInstance.listen(server.port, async () => {
      try {
        logger.info("Address %s", this.serverInstance.address());
      } catch (error) {
        logger.error(error);
        process.exit(0);
      };
    });
  };

};

/** 注册应用的启动类 **/
IOCContainer.bind(ExpressHttpServer).toSelf().inSingletonScope();