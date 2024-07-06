import { IOCContainer } from "@/commons/Application/IOCContainer";

import { DataSourceManager } from "@/commons/MySQL/DataSourceManager";
import { MySQLConnectManager } from "@/commons/MySQL/MySQLConnectManager";
import { QueryBuilderManager } from "@/commons/MySQL/QueryBuilderManager";
import { RedisConnectManager } from "@/commons/Redis/RedisConnectManager";
import { MongooseConnectManager } from "@/commons/MongoDB/MongooseConnectManager";
import { LimitedRabbitmqProducer } from "@/commons/RabbitMQ/LimitedRabbitmqProducer";
import { LimitedRabbitmqConsumer } from "@/commons/RabbitMQ/LimitedRabbitmqConsumer";
import { ApplicationConfigManager } from "@/commons/Application/ApplicationConfigManager";


export async function bootstrapApplication() {

  IOCContainer.bind(ApplicationConfigManager).toSelf().inSingletonScope();
  await IOCContainer.get(ApplicationConfigManager).initialize();

  // IOCContainer.bind(DataSourceManager).toSelf().inSingletonScope();
  // await IOCContainer.get(DataSourceManager).initialize();

  // IOCContainer.bind(MySQLConnectManager).toSelf().inSingletonScope();
  // await IOCContainer.get(MySQLConnectManager).initialize();

  // IOCContainer.bind(QueryBuilderManager).toSelf().inSingletonScope();
  // await IOCContainer.get(QueryBuilderManager).initialize();

  // IOCContainer.bind(RedisConnectManager).toSelf().inSingletonScope();
  // await IOCContainer.get(RedisConnectManager).initialize();

  // IOCContainer.bind(MongooseConnectManager).toSelf().inSingletonScope();
  // await IOCContainer.get(MongooseConnectManager).initialize();

  // IOCContainer.bind(LimitedRabbitmqProducer).toSelf().inSingletonScope();
  // await IOCContainer.get(LimitedRabbitmqProducer).initialize({
  //   exchangeName: "exchangeName",
  //   routerName: "routerName",
  //   queueName: "queueName"
  // });

  // IOCContainer.bind(LimitedRabbitmqConsumer).toSelf().inSingletonScope();
  // await IOCContainer.get(LimitedRabbitmqConsumer).initialize({
  //   exchangeName: "exchangeName",
  //   routerName: "routerName",
  //   queueName: "queueName"
  // });

};