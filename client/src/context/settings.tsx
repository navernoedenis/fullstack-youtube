import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import throttle from "lodash.throttle";

import { setAppTheme, getAppTheme, ThemeSchema } from "helpers/theme";

interface SettingsContextType {
  isAsideOpen: boolean;
  isMobile: boolean;
  setAndSaveTheme: (schema: ThemeSchema) => void;
  setAsideOpen: (value: boolean) => void;
  theme: ThemeSchema;
  toggleAside: () => void;
}

const SettingsContext = createContext<SettingsContextType>({
  isAsideOpen: false,
  isMobile: false,
  setAndSaveTheme: () => undefined,
  setAsideOpen: () => undefined,
  theme: "light",
  toggleAside: () => undefined,
});

interface SettingsProviderProps {
  children: ReactNode;
}

const MAX_PHONE_SCREEN_SIZE = 1313;

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [isComponentMounted, setComponentMounted] = useState(false);

  const [isAsideOpen, setAsideOpen] = useState(
    () => window.innerWidth > MAX_PHONE_SCREEN_SIZE
  );

  const [isMobile, setMobile] = useState(
    () => window.innerWidth <= MAX_PHONE_SCREEN_SIZE
  );

  const [theme, setTheme] = useState<ThemeSchema>(
    () => getAppTheme() ?? "light"
  );

  const toggleAside = () => {
    setAsideOpen((prev) => !prev);
  };

  const setAndSaveTheme = (schema: ThemeSchema) => {
    setAppTheme(schema);
    setTheme(schema);
  };

  useEffect(() => {
    setAppTheme(getAppTheme() ?? "light");
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = throttle(() => {
      setMobile(window.innerWidth <= MAX_PHONE_SCREEN_SIZE);
      if (!isAsideOpen) return;
      setAsideOpen(window.innerWidth >= MAX_PHONE_SCREEN_SIZE);
    }, 150);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isAsideOpen]);

  const memorizedValues = useMemo(() => {
    return {
      isAsideOpen,
      isMobile,
      setAndSaveTheme,
      setAsideOpen,
      theme,
      toggleAside,
    };
  }, [isAsideOpen, isMobile, theme]);

  if (!isComponentMounted) {
    return <div />;
  }

  return (
    <SettingsContext.Provider value={memorizedValues}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
