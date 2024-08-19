import { v4 as uuidv4 } from "uuid";
import { injectable, inject } from "inversify";

import { IOCContainer } from "@/commons/Application/IOCContainer";
import { SessionInfoService } from "@/services/SessionInfoService";

@injectable()
export class UserMessageService {

  private id = uuidv4();

  constructor(
    @inject(SessionInfoService) private readonly $SessionInfoService: SessionInfoService
  ) { };

  public async execute() {
    const sessionInfo = await this.$SessionInfoService.getSessionInfo();
    return { message: this.id, session: sessionInfo };
  };

};


IOCContainer.bind(UserMessageService).toSelf().inRequestScope();