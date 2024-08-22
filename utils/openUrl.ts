import * as Linking from "expo-linking";
import { Platform } from "react-native";

const openMailUri = (uri: string) => {
  window.location.href = uri;
};

const openUrl = (url: string) =>
  Platform.OS === "web"
    ? url.startsWith("mailto")
      ? openMailUri(url)
      : window.open(url, "_blank")!.focus()
    : Linking.openURL(url);

export default openUrl;
