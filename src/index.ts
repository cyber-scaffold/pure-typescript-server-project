import { IOCContainer } from "@/commons/Application/IOCContainer";

import { ExpressHttpServer } from "@/commons/Application/ExpressHttpServer";


/** 获取应用启动类,然后执行启动 **/
setImmediate(async () => {
  await IOCContainer.get(ExpressHttpServer).bootstrap();
});
