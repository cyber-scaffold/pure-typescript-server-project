import { injectable, inject } from "inversify";

import { ApplicationConfigManager } from "@/commons/Application/ApplicationConfigManager";
import { QueryBuilderManager } from "@/commons/MySQL/QueryBuilderManager";
import { RedisConnectManager } from "@/commons/Redis/RedisConnectManager";

@injectable()
export class MainServices {

  constructor(
    @inject(ApplicationConfigManager) private readonly applicationConfigManager: ApplicationConfigManager,
    @inject(QueryBuilderManager) private readonly queryBuilderManager: QueryBuilderManager,
    @inject(RedisConnectManager) private readonly redisConnectManager: RedisConnectManager,
  ) { };


};