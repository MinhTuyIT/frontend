import { config } from "@/config/gluestack";

import "@/config/logbox";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
import * as SentryWeb from "@sentry/browser";
import * as SentryNative from "@sentry/react-native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Slot, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useCallback, useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/features/auth";
import { ApolloClientProvider } from "@/providers/ApolloClient";
import { DrawerStatusProvider } from "@/providers/DrawerStatus";
import { MainHeaderLeftProvider } from "@/providers/MainHeaderLeft";
import { MainHeaderRightProvider } from "@/providers/MainHeaderRight";
import { NavThemeProvider } from "@/providers/NavTheme";
import { NetworkStatusProvider } from "@/providers/NetworkStatus";
import { loadFonts } from "@/utils/loadFonts";

import NetInfo from "@react-native-community/netinfo";
import { StripeWrapper } from "layout/StripeWrapper";

import { LoadingOverlay } from "../components";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  // initialRouteName: "index",
};

interface ChildrenProps {
  children: ReactNode;
}

// only send sentry errors if we're on a deployed device or site
try {
  if (Platform.OS === "web") {
    SentryWeb.init({
      dsn: "https://7b743a1329abe3691fbe19c10f617bf6@o4507016948875264.ingest.us.sentry.io/4507074114682880",
      release: Constants.expoConfig?.version,
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 1.0,
      replaysOnErrorSampleRate: 1.0,
      _experiments: {
        // profilesSampleRate is relative to tracesSampleRate.
        // Here, we'll capture profiles for 100% of transactions.
        profilesSampleRate: 1.0,
      },
      debug: false,
      integrations: [
        new SentryWeb.BrowserTracing(),
        new SentryWeb.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
    });
  } else {
    SentryNative.init({
      dsn: "https://7b743a1329abe3691fbe19c10f617bf6@o4507016948875264.ingest.us.sentry.io/4507074114682880",
      release: Constants.expoConfig?.version,
      tracesSampleRate: 1.0,
      _experiments: {
        // profilesSampleRate is relative to tracesSampleRate.
        // Here, we'll capture profiles for 100% of transactions.
        profilesSampleRate: 1.0,
      },
      debug: false,
    });
  }
} catch (e) {
  // Sentry.init can throw if we're in a browser that doesn't support it and on hot reload
}

if (Platform.OS !== "web") {
  SplashScreen.preventAutoHideAsync();
}

const CognitoWrapper = ({ children }: ChildrenProps) => {
  return (
    <GluestackUIProvider config={config}>
      <DrawerStatusProvider>
        <AuthProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </AuthProvider>
      </DrawerStatusProvider>
    </GluestackUIProvider>
  );
};

const AuthWrapper = ({ children }: ChildrenProps) => {
  const pathname = usePathname();
  const [fontsLoaded] = useFonts({
    ...MaterialCommunityIcons.font,
    ...FontAwesome.font,
    ...Ionicons.font,
    ...Entypo.font,
    ...MaterialIcons.font,
    ...Feather.font,
    ...SimpleLineIcons.font,
    ...AntDesign.font,
    ...loadFonts,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && Platform.OS !== "web") {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === "web") {
      SentryWeb.captureMessage(`click: ${pathname}`);
    }
  }, [pathname]);

  if (!fontsLoaded) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaProvider>
      <NetworkStatusProvider>
        <NavThemeProvider>
          <MainHeaderLeftProvider>
            <MainHeaderRightProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Box flex={1} onLayout={onLayoutRootView}>
                  <StatusBar barStyle="dark-content" />
                  {children}
                </Box>
              </GestureHandlerRootView>
            </MainHeaderRightProvider>
          </MainHeaderLeftProvider>
        </NavThemeProvider>
      </NetworkStatusProvider>
    </SafeAreaProvider>
  );
};

export default function Layout() {
  const { isConnected: _ } = NetInfo.useNetInfo();

  return (
    <ApolloClientProvider>
      <CognitoWrapper>
        <StripeWrapper>
          <Slot />
        </StripeWrapper>
      </CognitoWrapper>
    </ApolloClientProvider>
  );
}
