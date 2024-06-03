import { IOCContainer } from "@/commons/Application/IOCContainer";

import { HttpPostController } from "@/controllers/HttpPostController";
import { HttpGetController } from "@/controllers/HttpGetController";

export async function bootstrapController() {
  IOCContainer.bind(HttpPostController).toSelf().inSingletonScope();
  IOCContainer.bind(HttpGetController).toSelf().inSingletonScope();
};