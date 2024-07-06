import { v4 as uuidv4 } from "uuid";
import { injectable, inject } from "inversify";

import { SessionInfoService } from "@/services/SessionInfoService";

@injectable()
export class UserMessageService {

  private id = uuidv4();

  constructor(
    @inject(SessionInfoService) private readonly sessionInfoService: SessionInfoService
  ) { };

  public async execute() {
    const sessionInfo = await this.sessionInfoService.getSessionInfo();
    return { message: this.id, session: sessionInfo };
  };

};