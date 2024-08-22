import { LogBox } from "react-native";

// keyboardType is deprecated. Use inputMode
// returnKeyType is deprecated. Use enterKeyHint
const ignoreWarns = [
  "accessibilityLevel",
  "accessibilityInvalid",
  "accessibilityLabel",
  "accessibilityOrientation",
  "Warning: can't clean query",
  "returnKeyType",
  "BackHandler",
  "accessibilityLabel",
  "accessibilityRole",
  "focusable",
  "props.pointerEvents",
  "textShadow",
  "selectable",
  "StyleSheet",
  "EventEmitter.removeListener",
  "[fuego-swr-keys-from-collection-path]",
  "Setting a timer for a long period of time",
  "ViewPropTypes will be removed from React Native",
  "AsyncStorage has been extracted from react-native",
  "exported from 'deprecated-react-native-prop-types'.",
  "Non-serializable values were found in the navigation state.",
  // "VirtualizedLists should never be nested inside plain ScrollViews",
  "nativeID",
  "Animated",
  "accessibilityDescribedBy",
  "editable",
  "Image:",
];

const warn = console.warn;
console.warn = (...arg) => {
  for (const warning of ignoreWarns) {
    if (arg?.[0]?.startsWith?.(warning)) {
      return;
    }
  }
  warn(...arg);
};

const error = console.error;
console.error = (...arg) => {
  for (const warning of ignoreWarns) {
    if (arg?.[0]?.startsWith?.(warning)) {
      return;
    }
  }
  error(...arg);
};

LogBox.ignoreLogs(ignoreWarns);

export default LogBox;
