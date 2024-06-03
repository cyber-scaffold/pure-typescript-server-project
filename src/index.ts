import { IOCContainer } from "@/commons/Application/IOCContainer";
import { ExpressHttpServer } from "@/commons/Application/ExpressHttpServer";

import { bootstrapApplication } from "@/bootstrapApplication";
import { bootstrapController } from "@/bootstrapController";
import { bootstrapServices } from "@/bootstrapServices";

setImmediate(async () => {

  await bootstrapServices();
  await bootstrapController();
  await bootstrapApplication();

  IOCContainer.bind(ExpressHttpServer).toSelf();
  await IOCContainer.get(ExpressHttpServer).bootstrap();

});