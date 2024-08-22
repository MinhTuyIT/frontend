import { View } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { ReactNode } from "react";

import { useAuth } from "../../providers/Auth";

interface Props {
  children: ReactNode;
}

const ProtectedRouteContainer = ({ children }: Props) => {
  const authData = useAuth();
  const navigation = useNavigation();

  useFocusEffect(() => {
    if (authData?.auth === null) {
      navigation.reset({ routes: [{ name: "(home)" as never }] });
    }
  });

  if (!authData?.auth) {
    return <View />;
  }

  return children;
};

export default ProtectedRouteContainer;
