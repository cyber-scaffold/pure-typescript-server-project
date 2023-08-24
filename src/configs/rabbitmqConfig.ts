import { getGlobalConfig } from "@/frameworks/getGlobalConfig";


export const rabbitmq_config = {
  "host": "0.0.0.0",
  "port": 55672,
  "user": "root",
  "password": "gaea0571"
};

export async function getRabbitMQComposeConfig() {
  const globalConfig: any = getGlobalConfig;
  const rabbitMQComposeConfig = Object.assign({}, rabbitmq_config, globalConfig.rabbitMQ);
  console.log("当前RabbitMQ配置", JSON.stringify(rabbitMQComposeConfig));
  return rabbitMQComposeConfig;
};