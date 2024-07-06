import { IOCContainer } from "@/commons/Application/IOCContainer";

import { SessionInfoService } from "@/services/SessionInfoService";
import { TransientFactoryService, TransientFactoryServiceFactory } from "@/services/TransientFactoryService";


export async function bootstrapServices() {

  IOCContainer.bind(SessionInfoService).toSelf().inRequestScope();

  IOCContainer.bind(TransientFactoryService).toSelf();
  IOCContainer.bind(TransientFactoryServiceFactory).toFactory(TransientFactoryServiceFactory);

};