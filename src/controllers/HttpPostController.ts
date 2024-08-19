import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

// import { QueryBuilderManager } from "@/commons/MySQL/QueryBuilderManager";
// import { RedisConnectManager } from "@/commons/Redis/RedisConnectManager";
import { IOCContainer } from "@/commons/Application/IOCContainer";

import { TransientFactoryServiceFactory, TransientFactoryServiceProvider } from "@/services/TransientFactoryService";
import { RequestFactoryServiceFactory, RequestFactoryServiceProvider } from "@/services/RequestFactoryService";
import { UserMessageService } from "@/services/UserMessageService";
import { SessionInfoService } from "@/services/SessionInfoService";
import { responseWrap } from "@/utils/responseWrap";


/**
 * @openapi
 * /api/HttpPostController:
 *   post:
 *     tags: [信息类]
 *     summary: POST请求示例
 *     description: POST请求示例
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [param1,param2]
 *             properties:
 *               param1:
 *                 type: string
 *                 description: 请求参数1
 *               param2:
 *                 type: string
 *                 description: 请求参数2
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
export const router = Router().post("/api/HttpPostController", responseWrap(async (request: Request, response: Response) => {
  return await IOCContainer.get(HttpPostProcess).execute(request, response);
}));

@injectable()
export class HttpPostProcess {

  constructor(
    // @inject(QueryBuilderManager) private readonly queryBuilderManager: QueryBuilderManager,
    // @inject(RedisConnectManager) private readonly redisConnectManager: RedisConnectManager,
    @inject(SessionInfoService) private readonly $SessionInfoService: SessionInfoService,
    @inject(UserMessageService) private readonly $UserMessageService: UserMessageService,
    @inject(RequestFactoryServiceFactory) private readonly $RequestFactoryServiceProvider: RequestFactoryServiceProvider,
    @inject(TransientFactoryServiceFactory) private readonly $TransientFactoryServiceProvider: TransientFactoryServiceProvider
  ) { };

  public async execute(request: Request, response: Response): Promise<any> {
    const transientFactoryResult1 = await this.$TransientFactoryServiceProvider().execute();
    const transientFactoryResult2 = await this.$TransientFactoryServiceProvider().execute();
    const requestFacoryResult1 = await this.$RequestFactoryServiceProvider().execute();
    const requestFacoryResult2 = await this.$RequestFactoryServiceProvider().execute();
    const requestScopeServiceResult1 = await this.$SessionInfoService.getSessionInfo();
    const requestScopeServiceResult2 = await this.$SessionInfoService.getSessionInfo();
    const userMessage = await this.$UserMessageService.execute();
    return {
      "瞬态级别作用域工厂函数的结果": [transientFactoryResult1, transientFactoryResult2],
      "请求级别作用域工厂函数的结果": [requestFacoryResult1, requestFacoryResult2],
      "请求级别作用域的结果": [requestScopeServiceResult1, requestScopeServiceResult2],
      "用户信息": userMessage
    };
  };

};

IOCContainer.bind(HttpPostProcess).toSelf().inRequestScope();