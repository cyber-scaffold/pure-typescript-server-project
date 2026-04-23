#!/usr/bin/env node
import { IOCContainer } from "@/frameworks/mvc-server-build-tool/cores/IOCContainer";
import { FrameworkConfigManager } from "@/frameworks/mvc-server-build-tool/commons/FrameworkConfigManager";

import { MakeServerApplication } from "@/frameworks/mvc-server-build-tool/actions/MakeServerApplication";
import { CompilerActionService } from "@/frameworks/mvc-server-build-tool/services/CompilerActionService";

setImmediate(async () => {
  try {
    await IOCContainer.get(FrameworkConfigManager).initialize();
    await IOCContainer.get(CompilerActionService).cleanDestnation();
    /** 开发模式Express主服务应用编译 **/
    await IOCContainer.get(MakeServerApplication).bootstrapByDevelopmentMode();
  } catch (error) {
    console.log("error", error);
    process.exit(0);
  };
});