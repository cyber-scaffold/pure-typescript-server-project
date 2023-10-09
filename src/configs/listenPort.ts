import { getGlobalConfig } from "@/frameworks/getGlobalConfig";

export const listenPort = (() => {
  const globalConfig = getGlobalConfig();
  return globalConfig.server.port;
})();