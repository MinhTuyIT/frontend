import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

type HeaderRight =
  | null
  | ((props: {
      tintColor?: string | undefined;
      pressColor?: string | undefined;
      pressOpacity?: number | undefined;
      labelVisible?: boolean | undefined;
    }) => ReactElement | null);

interface ValueProps {
  Element?: HeaderRight;
  setElement: (Element: HeaderRight) => void;
  reset: () => void;
}

const MainHeaderRightContext = React.createContext<ValueProps>({
  Element: null,
  setElement: () => null,
  reset: () => null,
});

export const useMainHeaderRight = () =>
  React.useContext(MainHeaderRightContext);

const MainHeaderRightProvider = ({ children }: Props) => {
  const [Element, setElement] = useState<HeaderRight>(null);
  const handleSetElement = useCallback((Element: HeaderRight) => {
    setElement(() => Element);
  }, []);
  const value = useMemo(
    () => ({
      Element,
      setElement: handleSetElement,
      reset: () => handleSetElement(null),
    }),
    [Element, handleSetElement]
  );

  return (
    <MainHeaderRightContext.Provider value={value}>
      {children}
    </MainHeaderRightContext.Provider>
  );
};

export { MainHeaderRightContext, MainHeaderRightProvider };
