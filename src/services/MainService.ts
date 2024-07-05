import { injectable, interfaces, inject } from "inversify";

import { ApplicationConfigManager } from "@/commons/Application/ApplicationConfigManager";
import { QueryBuilderManager } from "@/commons/MySQL/QueryBuilderManager";
import { RedisConnectManager } from "@/commons/Redis/RedisConnectManager";

export type MainServiceProvider = () => MainService;

export function MainServiceFactory(context: interfaces.Context): MainServiceProvider {
  return function MainServiceProvider(): MainService {
    return context.container.get(MainService);
  };
};

@injectable()
export class MainService {

  constructor(
    @inject(ApplicationConfigManager) private readonly applicationConfigManager: ApplicationConfigManager,
    @inject(QueryBuilderManager) private readonly queryBuilderManager: QueryBuilderManager,
    @inject(RedisConnectManager) private readonly redisConnectManager: RedisConnectManager,
  ) { };

  public async execute() {
    return "this is the main service";
  };

};