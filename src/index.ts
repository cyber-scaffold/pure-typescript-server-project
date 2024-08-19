import { IOCContainer } from "@/commons/Application/IOCContainer";

import { ApplicationConfigManager } from "@/commons/Application/ApplicationConfigManager";
import { ExpressHttpServer } from "@/commons/Application/ExpressHttpServer";

import { LimitedRabbitmqProducer } from "@/commons/RabbitMQ/LimitedRabbitmqProducer";
import { LimitedRabbitmqConsumer } from "@/commons/RabbitMQ/LimitedRabbitmqConsumer";
import { MongooseConnectManager } from "@/commons/MongoDB/MongooseConnectManager";
import { MySQLConnectManager } from "@/commons/MySQL/MySQLConnectManager";
import { QueryBuilderManager } from "@/commons/MySQL/QueryBuilderManager";
import { RedisConnectManager } from "@/commons/Redis/RedisConnectManager";


setImmediate(async () => {

  /** 初始化应用配置 **/
  await IOCContainer.get(ApplicationConfigManager).initialize();

  /** 初始化生产者 **/
  await IOCContainer.get(LimitedRabbitmqProducer).initialize({
    exchangeName: "testExchange",
    routerName: "testRouter",
    queueName: "testQueue"
  });
  await IOCContainer.get(LimitedRabbitmqProducer).createQueueWithExchange();

  /** 初始化消费者 **/
  await IOCContainer.get(LimitedRabbitmqConsumer).initialize({
    exchangeName: "testExchange",
    routerName: "testRouter",
    queueName: "testQueue"
  });
  await IOCContainer.get(LimitedRabbitmqConsumer).createChannelWithExchange();

  /** 初始化MySQL **/
  await IOCContainer.get(MongooseConnectManager).initialize();

  /** 初始化MongoDB **/
  await IOCContainer.get(MySQLConnectManager).initialize();

  /** 初始化MySQL查询构建器 **/
  await IOCContainer.get(QueryBuilderManager).initialize();

  /** 初始化Redis **/
  await IOCContainer.get(RedisConnectManager).initialize();

  /** 启动express服务 **/
  await IOCContainer.get(ExpressHttpServer).bootstrap();

});