import os from "os";
import path from "path";
import { injectable } from "inversify";

import { getResourcePathInfo } from "@/frameworks/mvc-server-tool-box/runtime";
import { IOCContainer } from "@/main/cores/IOCContainer";


@injectable()
export class ApplicationConfigManager {

  private server = {
    port: 15200
  };

  private redis = {
    port: 6379,
    host: "0.0.0.0",
  };

  private mysql = {
    port: 3306,
    host: "0.0.0.0",
    username: "root",
    password: "gaea0571",
    database: "gmecamp_config"
  };

  private mongodb = {
    host: "0.0.0.0",
    port: 27017,
    username: "root",
    password: "gaea0571",
    database: "test_data"
  };

  private rabbitmq = {
    host: "0.0.0.0",
    port: 5672,
    username: "root",
    password: "gaea0571"
  };

  /**
   * 用户自定义的静态资源指向的目录
   * 框架层的基准目录是根据 项目根目录的绝对路径 计算得到的
   * **/
  private async getCustmerStaticResourceDirectory() {
    return path.join(os.homedir(), "./statics/");
  };

  /** 初始化并加载配置到运行时 **/
  public async initialize() {

  };

  /** 获取最终组合之后的运行时配置 **/
  public async getRuntimeConfig() {
    const resourcePathInfo = await getResourcePathInfo();
    return {
      server: this.server,
      redis: this.redis,
      mysql: this.mysql,
      mongodb: this.mongodb,
      rabbitmq: this.rabbitmq,
      assetsDirectoryName: resourcePathInfo.assetsDirectoryPath,
      swaggerResourceDirectory: resourcePathInfo.swaggerResourceDirectory,
      projectStaticResourceDirectory: resourcePathInfo.projectStaticResourceDirectory,
      custmerStaticResourceDirectory: await this.getCustmerStaticResourceDirectory()
    };
  };

};

IOCContainer.bind(ApplicationConfigManager).toSelf().inSingletonScope();