import { ScrollView, View, useBreakpointValue } from "@gluestack-ui/themed";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import HeaderAccount from "layout/HeaderAccount";
import { HeaderAccountViewProps } from "layout/HeaderAccount/HeaderAccountView";
import PageFooter from "layout/PageFooter";
import React, { ReactNode, useCallback } from "react";
import { testIDs } from "e2e/testIDs";

interface Props {
  children: ReactNode;
  headerProps: HeaderAccountViewProps;
}

const DrawerScreenContainer = ({ children, headerProps }: Props) => {
  const navigation = useNavigation();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleOpenDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);
  return (
    <ScrollView nestedScrollEnabled testID={testIDs.DRAWER.SCROLLVIEW}>
      {isMobile && (
        <HeaderAccount onMenuPress={handleOpenDrawer} {...headerProps} />
      )}
      <View bg="$white" flex={1} minHeight="$80">
        {children}
      </View>
      {isMobile && <PageFooter />}
    </ScrollView>
  );
};

export default DrawerScreenContainer;
