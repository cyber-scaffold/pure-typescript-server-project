import { getGlobalConfig } from "@/resources/getGlobalConfig";

export const listenPort = (() => {
  const globalConfig = getGlobalConfig();
  return globalConfig.server.port;
})();