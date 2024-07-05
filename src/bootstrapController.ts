import { IOCContainer } from "@/commons/Application/IOCContainer";

import { HttpPostProcess } from "@/controllers/HttpPostController";
import { HttpGetProcess } from "@/controllers/HttpGetController";

export async function bootstrapController() {
  IOCContainer.bind(HttpPostProcess).toSelf().inTransientScope();
  IOCContainer.bind(HttpGetProcess).toSelf().inTransientScope();
};