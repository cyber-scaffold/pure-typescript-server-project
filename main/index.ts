import { IOCContainer } from "@/main/cores/IOCContainer";
import { ExpressHttpServer } from "@/main/commons/Application/ExpressHttpServer";

/** 获取应用启动类,然后执行启动 **/
setImmediate(async () => {
  await IOCContainer.get(ExpressHttpServer).bootstrap();
});
