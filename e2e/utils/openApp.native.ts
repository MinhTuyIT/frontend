import { device } from "detox";
import { resolveConfig } from "detox/internals";

import { sleep } from "./internals";

const platform = device.getPlatform();

export async function openApp() {
  const config = await resolveConfig();
  if (config.configurationName.includes("debug")) {
    return await openAppForDebugBuild(platform);
  } else {
    return await device.launchApp({
      newInstance: true,
    });
  }
}

async function openAppForDebugBuild(platform: any) {
  const deepLinkUrl = getDeepLinkUrl(getDevLauncherPackagerUrl(platform));

  if (platform === "ios") {
    await device.launchApp({
      newInstance: true,
    });
    await sleep(3000);
    await device.openURL({
      url: deepLinkUrl,
    });
  } else {
    await device.launchApp({
      newInstance: true,
      url: deepLinkUrl,
    });
  }

  await sleep(3000);
}

const getDeepLinkUrl = (url: string) =>
  `exp+frontend://expo-development-client/?url=${encodeURIComponent(url)}`;

const getDevLauncherPackagerUrl = (platform: string) =>
  `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;
