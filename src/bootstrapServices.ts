import { IOCContainer } from "@/commons/Application/IOCContainer";

import { SessionInfoService } from "@/services/SessionInfoService";
import { UserMessageService } from "@/services/UserMessageService";
import { RequestFactoryService, RequestFactoryServiceFactory } from "@/services/RequestFactoryService";
import { TransientFactoryService, TransientFactoryServiceFactory } from "@/services/TransientFactoryService";


export async function bootstrapServices() {

  IOCContainer.bind(SessionInfoService).toSelf().inRequestScope();
  IOCContainer.bind(UserMessageService).toSelf().inRequestScope();

  IOCContainer.bind(RequestFactoryService).toSelf().inTransientScope();
  IOCContainer.bind(RequestFactoryServiceFactory).toFactory(RequestFactoryServiceFactory);

  IOCContainer.bind(TransientFactoryService).toSelf().inTransientScope();
  IOCContainer.bind(TransientFactoryServiceFactory).toFactory(TransientFactoryServiceFactory);

};