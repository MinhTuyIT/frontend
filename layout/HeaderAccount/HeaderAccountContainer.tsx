import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useCallback } from "react";

import HeaderAccountView, { HeaderAccountViewProps } from "./HeaderAccountView";

const HeaderAccountContainer = (props: HeaderAccountViewProps) => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    try {
      const canGoBack = navigation.canGoBack();
      if (canGoBack) {
        navigation.goBack();
      } else {
        navigation.getParent()?.getParent()?.dispatch(DrawerActions.openDrawer);
      }
    } catch (err) {
      navigation.getParent()?.getParent()?.dispatch(DrawerActions.openDrawer);
    }
  }, [navigation]);

  return <HeaderAccountView onBack={handleGoBack} {...props} />;
};

export default HeaderAccountContainer;
