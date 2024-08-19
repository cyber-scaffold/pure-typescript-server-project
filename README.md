# 基于MVC和控制反转架构的项目

> 以下资料可以帮助你理解,什么是控制反转,为什么要使用 控制反转(依赖注入)

- [Dependency Injection | 什么是依赖注入](https://www.youtube.com/watch?v=4_JFN-lZrqc)
- [一分钟了解控制反转](https://www.youtube.com/watch?v=b9pfqndmhdw)

**注意:**
以下资料只是介绍 控制反转(依赖注入),介绍者使用的语言各不相同,不要执着于某个框架
实际的typescript项目中应该使用 [inversify](https://www.npmjs.com/package/inversify) 控制反转依赖库

- 这个框架把所有可以自定义的结构全部暴露给开发者了,提供了最大的灵活度
- 在使用 控制反转(依赖注入) 的时候一定要注意每个class的生命周期(也叫作用域scope)

**需要区分http的请求和IOC容器的请求**

千万不要把这个两个概念搞混淆了 IOC容器的请求 不等于 HTTP的请求,这两个概念需要搭配在一起使用才是和预期的效果是一致的

- 理解一次IOC容器的请求: 调用一次IOC容器上的get方法就等于向IOC容器请求一次依赖解析的上下文 IOCContainer.get(...)
- 理解一次HTTP请求: 客户端向服务端发起的一次网络请求

两者在express框架中应该这样结合就能达到每次客户端发起网络请求就向IOC容器请求一次解析上下文的效果,这是开发时的预期效果

```ts
import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

import { IOCContainer } from "@/commons/Application/IOCContainer";
import { SessionInfoService } from "@/services/SessionInfoService";

export const router = Router().get("/api/HttpGetProcess", responseWrap(async (request: Request, response: Response) => {
  /** 
   * 在每次请求的时候去掉用 IOCContainer.get 方法,生成一次解析上下文
   * 同理如果是通过 @inject 获取依赖的话也应该搭配这样的结构来实现
   * **/
  const sessionInfo=await IOCContainer.get(SessionInfoService).getSessionInfo();
  // dosomething...
}));
```


# 目录结构解析

```conf
.
├── dist                打包后输出的资源文件夹
│   └── statics
├── frameworks          工程化配置(webpack与swagger生成器)相关的文件夹
│   ├── loaders         存放 webpack loaders 相关配置的文件夹
│   ├── utils           与工程化相关的工具函数
│   └── webpack         webpack相关的工程化配置
├── logs                运行时的日志文件夹
└── src                 源代码文件夹
    ├── commons         存放通用依赖的文件夹
    ├── controllers     存放控制器的文件夹
    ├── interceptors    存放拦截器中间件的文件夹
    ├── resources       存放资源的文件夹,比如图片和swagger-ui等静态资源
    ├── services        存放Service多态内聚类文件夹
    └── utils           业务层的工具函数
```