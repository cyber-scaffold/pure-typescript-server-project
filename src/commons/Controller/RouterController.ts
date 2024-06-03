import { injectable } from "inversify";
import { Express, Router } from "express";

/** 基于IOC路由控制器的抽象类 **/
@injectable()
export abstract class RouterController {

  public router = Router();

  /** 定义控制器行为的抽象方法 **/
  public abstract definition(): Promise<any>;

  /** 
   * 在express框架上注册路由控制器 
   * 之前直接使用router定义路由控制器的时候如果有错误的话并不会抛出错误
   * 如果使用这个方式在express上注册路由控制器的话,就会有错误提示
   * **/
  public async registryRouter(serverApplication: Express): Promise<any> {
    try {
      await this.definition();
      serverApplication.use(this.router);
    } catch (error) {
      console.log("在express框架上注册路由控制器时发生错误", error);
      process.exit(0);
    };
  };

};