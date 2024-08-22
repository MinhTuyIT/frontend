import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

interface Props {
  children: ReactNode;
  theme?: typeof DefaultTheme | typeof DarkTheme;
}

interface ValueProps {
  theme?: typeof DefaultTheme | typeof DarkTheme;
  setTheme?: (theme: typeof DefaultTheme | typeof DarkTheme) => void;
}

const NavThemeContext = React.createContext<ValueProps>({});

const NavThemeProvider = ({
  children,
  theme: passedTheme = DefaultTheme,
}: Props) => {
  const [theme, setTheme] = useState(passedTheme);
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  useEffect(() => {
    setTheme(passedTheme);
  }, [passedTheme]);

  return (
    <ThemeProvider value={theme}>
      <NavThemeContext.Provider value={value}>
        {children}
      </NavThemeContext.Provider>
    </ThemeProvider>
  );
};

export { NavThemeContext, NavThemeProvider };
