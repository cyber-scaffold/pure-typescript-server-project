import os from "os";
import path from "path";
import { readFile } from "jsonfile";

export const rabbitmq_config = {
  "host": "0.0.0.0",
  "port": 55672,
  "user": "root",
  "password": "gaea0571"
};

export async function get_rabbitmq_compose_config() {
  const gpms_config = await readFile(path.resolve(os.homedir(), "./.gpms_config.json"));
  const rabbitmq_compose_config = Object.assign({}, rabbitmq_config, gpms_config.rabbitMQ);
  console.log("当前RabbitMQ配置", JSON.stringify(rabbitmq_compose_config));
  return rabbitmq_compose_config;
};