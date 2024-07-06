import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

import { IOCContainer } from "@/commons/Application/IOCContainer";
// import { QueryBuilderManager } from "@/commons/MySQL/QueryBuilderManager";
// import { RedisConnectManager } from "@/commons/Redis/RedisConnectManager";

import { TransientFactoryServiceFactory, TransientFactoryServiceProvider } from "@/services/TransientFactoryService";
import { UserMessageService } from "@/services/UserMessageService";
import { SessionInfoService } from "@/services/SessionInfoService";

import { responseWrap } from "@/utils/responseWrap";

/**
 * @openapi
 * /api/HttpGetController:
 *   get:
 *     tags: [信息类]
 *     summary: GET请求示例
 *     description: GET请求示例
 *     parameters:
 *       - in: query
 *         name: param1
 *         required: true
 *         description: 请求参数1
 *         schema:
 *           type: integer
 *       - in: query
 *         name: param2
 *         required: true
 *         description: 请求参数2
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: code=0的情况代表后端业务流程没有任何错误,code不等于0的情况就代表后端业务执行的时候发生了错误,具体的错误信息在message字段中
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: 响应状态码(code=0的情况代表后端业务流程没有任何错误,code不等于0的情况就代表后端业务执行的时候发生了错误)
 *                 data:
 *                   type: object
 *                   description: 业务代码的返回值
 *                 message:
 *                   type: string
 *                   description: 状态信息(如果code不等于0的话会将错误信息打印到这里)
 */
export const router = Router().get("/api/HttpGetProcess", responseWrap(async (request: Request, response: Response) => {
  const requestScopeContainer = IOCContainer.createChild();
  requestScopeContainer.bind(HttpGetProcess).toSelf().inSingletonScope();
  return await requestScopeContainer.get(HttpGetProcess).execute(request, response);
}));

@injectable()
export class HttpGetProcess {

  constructor(
    // @inject(QueryBuilderManager) private readonly queryBuilderManager: QueryBuilderManager,
    // @inject(RedisConnectManager) private readonly redisConnectManager: RedisConnectManager,
    @inject(SessionInfoService) private readonly sessionInfoService: SessionInfoService,
    @inject(UserMessageService) private readonly userMessageService: UserMessageService,
    @inject(TransientFactoryServiceFactory) private readonly transientFactoryServiceProvider: TransientFactoryServiceProvider
  ) { };

  public async execute(request: Request, responses: Response): Promise<any> {
    const transientServiceResult1 = await this.transientFactoryServiceProvider().execute();
    const transientServiceResult2 = await this.transientFactoryServiceProvider().execute();
    const requestScopeServiceResult1 = await this.sessionInfoService.getSessionInfo();
    const requestScopeServiceResult2 = await this.sessionInfoService.getSessionInfo();
    const userMessage = await this.userMessageService.execute();
    return {
      "瞬态服务的结果": [transientServiceResult1, transientServiceResult2],
      "请求作用域级别的结果": [requestScopeServiceResult1, requestScopeServiceResult2],
      "用户信息": userMessage
    };
  };

};
