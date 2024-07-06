import { Container } from "inversify";
import { Request, Response, NextFunction } from "express";

import { IOCContainer } from "@/commons/Application/IOCContainer";


declare global {
  namespace Express {
    interface Request {
      childContainer: Container;
    }
  }
};

/**
 * @description 关于为什么要使用createChild为每个请求创建独立的容器
 * createChild存在的意义就是可以重新定义服务的作用域，
 * 有可能一个服务原本在原始容器中是单例模式，
 * 但是我在某些情况下需要让他成为一个瞬态作用域服务，
 * 这个时候就需要用到createChild了
 * **/
export async function requestScopeMiddleware(request: Request, response: Response, next: NextFunction) {
  const childContainer = IOCContainer.createChild();
  request.childContainer = childContainer;
  next();
};