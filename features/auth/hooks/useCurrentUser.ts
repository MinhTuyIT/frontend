import * as SentryWeb from "@sentry/browser";
import * as SentryNative from "@sentry/react-native";
import { useEffect } from "react";
import { Platform } from "react-native";

import { useAuth } from "../providers/Auth";

import { useAuthMeQuery } from "@/generated/graphql";

const Sentry = Platform.OS === "web" ? SentryWeb : SentryNative;

const useCurrentUser = () => {
  const authData = useAuth();
  const { data } = useAuthMeQuery({
    skip: !authData?.auth,
  });

  useEffect(() => {
    if (data?.me) {
      Sentry.setUser({
        id: (data?.me?.id ?? "").toString(),
      });
    } else {
      Sentry.setUser(null);
    }
  }, [data]);

  return data?.me;
};

export default useCurrentUser;
