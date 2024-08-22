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

type HeaderLeft = (props: {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
  labelVisible?: boolean | undefined;
}) => ReactElement | null;

interface ValueProps {
  Element?: HeaderLeft;
  setElement: (Element: HeaderLeft) => void;
  reset: () => void;
}

const Empty = () => null;

const MainHeaderLeftContext = React.createContext<ValueProps>({
  Element: () => null,
  setElement: () => null,
  reset: () => null,
});

export const useMainHeaderLeft = () => React.useContext(MainHeaderLeftContext);

const MainHeaderLeftProvider = ({ children }: Props) => {
  const [Element, setElement] = useState<HeaderLeft>(() => Empty);
  const handleSetElement = useCallback((Element: HeaderLeft) => {
    setElement(() => Element);
  }, []);
  const value = useMemo(
    () => ({
      Element,
      setElement: handleSetElement,
      reset: () => handleSetElement(Empty),
    }),
    [Element, handleSetElement]
  );

  return (
    <MainHeaderLeftContext.Provider value={value}>
      {children}
    </MainHeaderLeftContext.Provider>
  );
};

export { MainHeaderLeftContext, MainHeaderLeftProvider };
