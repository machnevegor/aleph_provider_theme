import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "https://esm.sh/react@17.0.2";

export enum Mode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export interface Theme {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
}

export const ThemeContext = createContext<Theme>({
  mode: Mode.SYSTEM,
  setMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface Props {
  children: ReactNode;
  initialMode?: Mode;
}

const update = () => {
  const mode = localStorage.theme || Mode.SYSTEM;
  mode === Mode.DARK || mode === Mode.SYSTEM &&
      matchMedia("(prefers-color-scheme: dark)").matches
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
};

export default function ThemeProvider(
  { children, initialMode = Mode.SYSTEM }: Props,
) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    mode === Mode.SYSTEM
      ? localStorage.removeItem("theme")
      : localStorage.setItem("theme", mode);
    update();
  }, [mode]);

  useEffect(() => {
    matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", update);
  }, []);

  const value = useMemo(
    () => ({ mode, setMode }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
