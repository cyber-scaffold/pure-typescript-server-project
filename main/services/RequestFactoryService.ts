import { v4 as uuidv4 } from "uuid";
import { injectable, inject } from "inversify";

import { IOCContainer } from "@/main/cores/IOCContainer";
import { ApplicationConfigManager } from "@/main/commons/Application/ApplicationConfigManager";

import type { interfaces } from "inversify";

export type RequestFactoryServiceProvider = () => RequestFactoryService;

export function RequestFactoryServiceFactory(context: interfaces.Context): RequestFactoryServiceProvider {
  return function RequestFactoryServiceProvider(): RequestFactoryService {
    return context.container.get(RequestFactoryService);
  };
};

/**
 * @description 测试inRequestScope在工厂模式下的行为
 * inRequestScope级别的作用域在工厂模式下也和inTransientScope的服务行为保持一致
 * **/
@injectable()
export class RequestFactoryService {

  private id = uuidv4();

  constructor (
    @inject(ApplicationConfigManager) private readonly $ApplicationConfigManager: ApplicationConfigManager
  ) { };

  public async execute() {
    return this.id;
  };

};

IOCContainer.bind(RequestFactoryService).toSelf().inTransientScope();
IOCContainer.bind(RequestFactoryServiceFactory).toFactory(RequestFactoryServiceFactory);

