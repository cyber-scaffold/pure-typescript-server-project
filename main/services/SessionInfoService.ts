import { v4 as uuidv4 } from "uuid";
import { injectable, inject } from "inversify";

import { IOCContainer } from "@/main/cores/IOCContainer";
import { ApplicationConfigManager } from "@/main/commons/Application/ApplicationConfigManager";

import type { interfaces } from "inversify";

/**
 * 会话级别的服务就特别适合用 RequestScope 作用域
 * **/
@injectable()
export class SessionInfoService {

  private id = uuidv4();

  constructor (
    @inject(ApplicationConfigManager) private readonly $ApplicationConfigManager: ApplicationConfigManager
  ) { };

  public async getSessionInfo() {
    return this.id;
  };

};

IOCContainer.bind(SessionInfoService).toSelf().inRequestScope();