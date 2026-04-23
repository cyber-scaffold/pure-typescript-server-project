import os from "os";
import path from "path";
import { injectable } from "inversify";

import { readProjectDirectoryAbsolutePath } from "@/frameworks/mvc-server-tool-box/runtime";
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
   * 编译后的资产对应的目录名
   * **/
  private assetsDirectoryName = "dist";

  /**
   * 编译资产对应的资源路径
   * **/
  private async getAssetsDirectoryPath() {
    const projectDirectoryPath = readProjectDirectoryAbsolutePath();
    return path.resolve(projectDirectoryPath, this.assetsDirectoryName)
  };

  /**
   * 用户自定义的静态资源指向的目录
   * 框架层的基准目录是根据 项目根目录的绝对路径 计算得到的
   * **/
  private async getCustmerStaticResourceDirectory() {
    return path.join(os.homedir(), "./statics/");
  };

  /**
   * 项目中的静态资源指向的目录
   * 框架层的基准目录是根据 项目根目录的绝对路径 计算得到的
   * **/
  private async getProjectStaticResourceDirectory() {
    const assetsDirectoryPath = await this.getAssetsDirectoryPath();
    return path.join(assetsDirectoryPath, "statics");
  };

  /**
   * Swagger静态资源所在的目录
   * **/
  private async getSwaggerResourceDirectory() {
    const assetsDirectoryPath = await this.getAssetsDirectoryPath();
    return path.join(assetsDirectoryPath, "swagger");
  };

  /** 初始化并加载配置到运行时 **/
  public async initialize() {

  };

  /** 获取最终组合之后的运行时配置 **/
  public async getRuntimeConfig() {
    return {
      server: this.server,
      redis: this.redis,
      mysql: this.mysql,
      mongodb: this.mongodb,
      rabbitmq: this.rabbitmq,
      assetsDirectoryName: await this.getAssetsDirectoryPath(),
      custmerStaticResourceDirectory: await this.getCustmerStaticResourceDirectory(),
      projectStaticResourceDirectory: await this.getProjectStaticResourceDirectory(),
      swaggerResourceDirectory: await this.getSwaggerResourceDirectory()
    };
  };

};

IOCContainer.bind(ApplicationConfigManager).toSelf().inSingletonScope();