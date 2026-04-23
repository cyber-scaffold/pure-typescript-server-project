import { v4 as uuidv4 } from "uuid";
import { injectable, inject } from "inversify";

import { IOCContainer } from "@/main/cores/IOCContainer";
import { ApplicationConfigManager } from "@/main/commons/Application/ApplicationConfigManager";

import type { interfaces } from "inversify";

export type TransientFactoryServiceProvider = () => TransientFactoryService;

export function TransientFactoryServiceFactory(context: interfaces.Context): TransientFactoryServiceProvider {
  return function TransientFactoryServiceProvider(): TransientFactoryService {
    return context.container.get(TransientFactoryService);
  };
};


/**
 * @description 测试inTransientScope在工厂模式下的行为
 * **/
@injectable()
export class TransientFactoryService {

  private id = uuidv4();

  constructor (
    @inject(ApplicationConfigManager) private readonly $ApplicationConfigManager: ApplicationConfigManager
  ) { };

  public async execute() {
    return this.id;
  };

};

IOCContainer.bind(TransientFactoryService).toSelf().inTransientScope();
IOCContainer.bind(TransientFactoryServiceFactory).toFactory(TransientFactoryServiceFactory);