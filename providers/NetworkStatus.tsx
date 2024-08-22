import { SafeAreaView, Text, VStack, View } from "@gluestack-ui/themed";
import * as Network from "expo-network";
import React, { ReactNode, useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";

interface Props {
  children: ReactNode;
}

const NetworkStatusContext = React.createContext<boolean>(true);

export const useNetworkStatus = () => React.useContext(NetworkStatusContext);

const NetworkStatusProvider = ({ children }: Props) => {
  const [hasInternetAccess, setHasInternetAccess] = useState<boolean>(true);
  useEffect(() => {
    Network.getNetworkStateAsync().then(networkState =>
      setHasInternetAccess(
        !!networkState?.isConnected && !!networkState?.isInternetReachable
      )
    );
  });

  return (
    <NetworkStatusContext.Provider value={hasInternetAccess}>
      {!hasInternetAccess && (
        <View bg="$error500">
          <SafeAreaView
            pt={Platform.OS === "android" ? StatusBar.currentHeight : 0}
          >
            <VStack space="md" p="$5">
              <Text
                fontFamily="$bodyBold"
                fontSize="$lg"
                lineHeight={25}
                color="$white"
              >
                No Internet Connection
              </Text>
              <Text color="$white">
                The internet cannot be reached right now. You will be able to
                continue when you get into an area with better connectivity.
              </Text>
            </VStack>
          </SafeAreaView>
        </View>
      )}
      {children}
    </NetworkStatusContext.Provider>
  );
};

export { NetworkStatusContext, NetworkStatusProvider };
