import knex from "knex";
import { injectable, inject } from "inversify";

import { IOCContainer } from "@/main/cores/IOCContainer";
import { ApplicationConfigManager } from "@/main/commons/Application/ApplicationConfigManager";

import type { Knex } from "knex";

@injectable()
export class QueryBuilderManager {

  private _knexQueryBuilder: Knex;

  constructor (
    @inject(ApplicationConfigManager) private readonly $ApplicationConfigManager: ApplicationConfigManager
  ) { };

  /** 初始化knex**/
  public async initialize() {
    const { mysql } = await this.$ApplicationConfigManager.getRuntimeConfig();
    this._knexQueryBuilder = knex({
      client: "mysql2",
      connection: {
        host: mysql.host,
        port: mysql.port,
        user: mysql.username,
        password: mysql.password,
        database: mysql.database
      }
    });
    console.log("knex数据访问层初始化成功!");
  };

  /** 根据数据库名称获取knex的QueryBuilder **/
  public async getQueryBuilder(): Promise<Knex> {
    return this._knexQueryBuilder;
  };

};

IOCContainer.bind(QueryBuilderManager).toSelf().inSingletonScope();