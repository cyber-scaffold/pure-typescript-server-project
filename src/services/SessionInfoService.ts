import { v4 as uuidv4 } from "uuid";
import { injectable, inject, interfaces } from "inversify";

import { ApplicationConfigManager } from "@/commons/Application/ApplicationConfigManager";
import { IOCContainer } from "@/commons/Application/IOCContainer";

/**
 * 会话级别的服务就特别适合用 RequestScope 作用域
 * **/
@injectable()
export class SessionInfoService {

  private id = uuidv4();

  constructor(
    @inject(ApplicationConfigManager) private readonly $ApplicationConfigManager: ApplicationConfigManager
  ) { };

  public async getSessionInfo() {
    return this.id;
  };

};

IOCContainer.bind(SessionInfoService).toSelf().inRequestScope();