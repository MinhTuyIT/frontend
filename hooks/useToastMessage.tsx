import { MaterialIcons } from "@expo/vector-icons";
import {
  CloseIcon,
  HStack,
  Icon,
  Pressable,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useBreakpointValue,
  useToast,
  useToken,
} from "@gluestack-ui/themed";
import { InterfaceToastProps } from "@gluestack-ui/toast/lib/typescript/types";
import { testIDs } from "e2e/testIDs";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { NativeModules, Platform, useWindowDimensions } from "react-native";
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === "web" ? 0 : StatusBarManager.HEIGHT;

// enum ToastAction {
//   SUCCESS = "success",
//   ERROR = "error",
//   WARNING = "warning",
//   INFO = "info",
//   ATTENTION = "attention",
// }

interface ShowToastProps extends InterfaceToastProps {
  title?: string;
  description?: string;
  action?: "success" | "error" | "warning" | "info" | "attention";
}

const HIT_SLOP = {
  top: 15,
  left: 15,
  right: 15,
  bottom: 15,
};

// Function to get background color based on action type
const getBackgroundColor = (action: string) => {
  switch (action) {
    case "success":
      return "$defaultColor";
    case "error":
      return "$error600";
    case "warning":
      return "orange";
    case "info":
      return "blue";
    case "attention":
      return "purple";
    default:
      return "gray";
  }
};

const getIcon = (action: string) => {
  switch (action) {
    case "success":
      return "check-circle";
    case "error":
      return "error";
    case "warning":
      return "warning";
    case "info":
      return "info";
    case "attention":
      return "notification-important";
    default:
      return "info";
  }
};

const useToastMessage = () => {
  const toast = useToast();
  const { width } = useWindowDimensions();
  const isSmall = useBreakpointValue({ base: true, md: false });
  const whiteColor = useToken("colors", "white");

  const toastRef = useRef<typeof toast>(toast); // Prevent the toast from triggering a re-render.

  const show = useCallback(
    (props: ShowToastProps) => {
      const { title, description, action = "success", ...restProps } = props;
      const descriptionWithDefaultErrorText =
        action === "error" && !description
          ? "There has been an error, please try again"
          : description;
      toastRef.current.show({
        placement: isSmall ? "top" : "top right",
        containerStyle: {
          flexDirection: "column",
        },
        render: ({ id }) => (
          <Toast
            nativeID={`toast-${id}`}
            action={action}
            variant="solid"
            bg={getBackgroundColor(action)}
            borderRadius={10}
            mt={Platform.OS === "ios" ? 20 : STATUSBAR_HEIGHT + 20}
            w={Platform.OS !== "web" ? width - 56 : undefined}
            mx={isSmall ? 10 : 62}
            minWidth={Platform.OS === "web" ? 300 : undefined}
          >
            <HStack gap="$1.5" w="$full" alignItems="center">
              <MaterialIcons
                name={getIcon(action)}
                size={26}
                color={whiteColor}
              />
              <VStack flex={1}>
                {Boolean(title) && (
                  <ToastTitle color="$white">{title}</ToastTitle>
                )}
                {Boolean(descriptionWithDefaultErrorText) && (
                  <ToastDescription
                    color="$white"
                    fontSize={14}
                    fontFamily="$body"
                    lineHeight={Platform.OS === "web" ? 20 : 26}
                    flex={1}
                  >
                    {descriptionWithDefaultErrorText}
                  </ToastDescription>
                )}
              </VStack>
              <Pressable
                onPress={() => toastRef.current.close(id)}
                hitSlop={HIT_SLOP}
                testID={testIDs.TOAST.CLOSE}
              >
                <Icon as={CloseIcon} size="md" color={whiteColor} />
              </Pressable>
            </HStack>
          </Toast>
        ),
        ...restProps,
      });
    },
    [isSmall, whiteColor, width]
  );

  const toastConfig = useMemo(
    () => ({
      ...toastRef.current,
      show,
    }),
    [show]
  );

  useEffect(() => {
    toastRef.current = toast;
  }, [toast]);

  return toastConfig;
};

export default useToastMessage;
