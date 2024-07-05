import { IOCContainer } from "@/commons/Application/IOCContainer";

import { TransientService } from "@/services/TransientService";
import { TransientFactoryService, TransientFactoryServiceFactory } from "@/services/TransientFactoryService";


export async function bootstrapServices() {

  IOCContainer.bind(TransientService).toSelf().inTransientScope();

  IOCContainer.bind(TransientFactoryService).toSelf();
  IOCContainer.bind(TransientFactoryServiceFactory).toFactory(TransientFactoryServiceFactory);

};