import { useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useEffect, useState } from "react";

import { isDrawerExpandedVar } from "@/utils/cache";

interface Props {
  children: ReactNode;
}

const DrawerStatusContext = React.createContext<boolean | undefined>(undefined);

export const useDrawerStatus = () => React.useContext(DrawerStatusContext);

const DrawerStatusProvider = ({ children }: Props) => {
  const isDrawerExpanded = useReactiveVar(isDrawerExpandedVar);

  const [loaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(
        "@DrawerExpanded",
        !isDrawerExpanded ? "false" : "true"
      );
    }
  }, [isDrawerExpanded, loaded]);

  useEffect(() => {
    AsyncStorage.getItem("@DrawerExpanded")
      .then(
        (
          strValue //Default to open if no preferences are found.
        ) =>
          !strValue ? setIsExpanded(true) : setIsExpanded(strValue === "true")
      )
      .then(() => setIsLoaded(true));
  }, []);

  return (
    <DrawerStatusContext.Provider value={isExpanded}>
      {isExpanded === undefined ? null : children}
    </DrawerStatusContext.Provider>
  );
};

export { DrawerStatusContext, DrawerStatusProvider };
