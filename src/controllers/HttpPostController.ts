import { injectable, inject } from "inversify";

import { RouterController } from "@/commons/Controller/RouterController";
import { QueryBuilderManager } from "@/commons/MySQL/QueryBuilderManager";
import { RedisConnectManager } from "@/commons/Redis/RedisConnectManager";

import { MainServiceFactory, MainServiceProvider } from "@/services/MainService";
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
@injectable()
export class HttpPostController extends RouterController {

  constructor(
    @inject(QueryBuilderManager) private readonly queryBuilderManager: QueryBuilderManager,
    @inject(RedisConnectManager) private readonly redisConnectManager: RedisConnectManager,
    @inject(MainServiceFactory) private readonly mainServiceProvider: MainServiceProvider
  ) {
    super()
  };

  public async definition(): Promise<any> {
    this.router.post("/api/HttpPostController", responseWrap(async () => {
      const mainService = this.mainServiceProvider();
      return await mainService.execute();
    }));
  };

}