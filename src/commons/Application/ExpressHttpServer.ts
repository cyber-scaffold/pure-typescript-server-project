import path from "path";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { injectable, inject } from "inversify";

import { IOCContainer } from "@/commons/Application/IOCContainer";

import { ApplicationConfigManager } from "@/commons/Application/ApplicationConfigManager";
import { LimitedRabbitmqProducer } from "@/commons/RabbitMQ/LimitedRabbitmqProducer";
import { LimitedRabbitmqConsumer } from "@/commons/RabbitMQ/LimitedRabbitmqConsumer";
import { MongooseConnectManager } from "@/commons/MongoDB/MongooseConnectManager";
import { MySQLConnectManager } from "@/commons/MySQL/MySQLConnectManager";
import { QueryBuilderManager } from "@/commons/MySQL/QueryBuilderManager";
import { RedisConnectManager } from "@/commons/Redis/RedisConnectManager";

import { requestMiddleware } from "@/interceptors/requestMiddleware";
import { TestPostController } from "@/controllers/TestPostController";
import { TestGetController } from "@/controllers/TestGetController";

@injectable()
export class ExpressHttpServer {

  private app = express();

  private server: http.Server;

  private filebaseDirectory = path.dirname(__filename);

  constructor(
    @inject(ApplicationConfigManager) private readonly $ApplicationConfigManager: ApplicationConfigManager,
    @inject(LimitedRabbitmqProducer) private readonly $LimitedRabbitmqProducer: LimitedRabbitmqProducer,
    @inject(LimitedRabbitmqConsumer) private readonly $LimitedRabbitmqConsumer: LimitedRabbitmqConsumer,
    @inject(MongooseConnectManager) private readonly $MongooseConnectManager: MongooseConnectManager,
    @inject(MySQLConnectManager) private readonly $MySQLConnectManager: MySQLConnectManager,
    @inject(QueryBuilderManager) private readonly $QueryBuilderManager: QueryBuilderManager,
    @inject(RedisConnectManager) private readonly $RedisConnectManager: RedisConnectManager,
    @inject(TestPostController) private readonly $TestPostController: TestPostController,
    @inject(TestGetController) private readonly $TestGetController: TestGetController
  ) { }

  /** 初始化MongoDB **/
  private async bootstrapMySQL() {
    await this.$MySQLConnectManager.initialize();
    /** 初始化MySQL查询构建器 **/
    await this.$QueryBuilderManager.initialize();
  };

  /** 初始化Redis **/
  private async bootstrapRedis() {
    await this.$RedisConnectManager.initialize();
  };

  /** 初始化MongoDB **/
  private async bootstrapMongoDB() {
    await this.$MongooseConnectManager.initialize();
  };

  /** 初始化RabbitMQ **/
  private async bootstrapRabbitMQ() {
    /** 初始化生产者 **/
    await this.$LimitedRabbitmqProducer.initialize({
      exchangeName: "testExchange",
      routerName: "testRouter",
      queueName: "testQueue"
    });
    await this.$LimitedRabbitmqProducer.createQueueWithExchange();

    /** 初始化消费者 **/
    await this.$LimitedRabbitmqConsumer.initialize({
      exchangeName: "testExchange",
      routerName: "testRouter",
      queueName: "testQueue"
    });
    await this.$LimitedRabbitmqConsumer.createChannelWithExchange();
  };

  public async bootstrap() {
    await this.$ApplicationConfigManager.initialize();
    /** 注册中间件 **/
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    /** 注册请求级容器中间件 **/
    this.app.use(requestMiddleware);
    /** 注册控制器 **/
    this.app.use(this.$TestPostController.getRouter());
    this.app.use(this.$TestGetController.getRouter());
    /** 启动静态资源文件夹 **/
    this.app.use("/", express.static(path.resolve(this.filebaseDirectory, "./public/statics/")));
    /** 启动swagger文档 **/
    this.app.use("/swagger", express.static(path.resolve(this.filebaseDirectory, "./public/swagger/")));
    /** 启动服务器监听端口 **/
    const { server } = this.$ApplicationConfigManager.getRuntimeConfig();
    this.server = this.app.listen(server.port, async () => {
      try {
        // await this.bootstrapMySQL();
        // await this.bootstrapMongoDB();
        // await this.bootstrapRedis();
        // await this.bootstrapRabbitMQ();
        console.log("address", this.server.address());
      } catch (error) {
        console.log(error);
        process.exit(0);
      };
    });
  };

};

/** 注册应用的启动类 **/
IOCContainer.bind(ExpressHttpServer).toSelf().inSingletonScope();