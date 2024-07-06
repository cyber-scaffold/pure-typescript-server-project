import { IOCContainer } from "@/commons/Application/IOCContainer";
import { ExpressHttpServer } from "@/commons/Application/ExpressHttpServer";

import { bootstrapApplication } from "@/bootstrapApplication";
import { bootstrapControllers } from "@/bootstrapControllers";
import { bootstrapServices } from "@/bootstrapServices";

setImmediate(async () => {

  await bootstrapApplication();
  await bootstrapServices();
  await bootstrapControllers();

  IOCContainer.bind(ExpressHttpServer).toSelf().inSingletonScope();
  await IOCContainer.get(ExpressHttpServer).bootstrap();

});