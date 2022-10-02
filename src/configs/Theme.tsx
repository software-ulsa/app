import Colors from "./Colors";
import React, { useContext } from "react";
import { ColorValue } from "react-native";

export type TMode = "dark" | "light";

export interface ITheme {
  background: ColorValue;
  backgroundItem: ColorValue;
  text: ColorValue;
  text_placeholder: ColorValue;
  activeBackgroundColor: ColorValue;
  inactiveBackgroundColor: ColorValue;
  activeTincolor: ColorValue;
  backgroundHeader: ColorValue | string;
  borderColor: ColorValue | string;
  placeholder: ColorValue | string;
  tintColor: ColorValue;
  textCalender: ColorValue;
}
export interface IThemeContext {
  theme: ITheme;
  toggleTheme: () => void;
}

export const themes = {
  dark: {
    background: Colors.Dark,
    backgroundItem: Colors.Item,
    text: Colors.WhiteText,
    text_placeholder: Colors.InputDark,
    activeBackgroundColor: Colors.TealBlue,
    activeTincolor: Colors.White,
    inactiveBackgroundColor: Colors.OpacityLine,
    backgroundHeader: Colors.Dark,
    tintColor: Colors.White,
    textCalender: Colors.White,
    borderColor: Colors.WhiteBorder,
    placeholder: Colors.Placeholder,
    lineColor: Colors.Placeholder,
  },
  light: {
    background: Colors.Snow,
    backgroundItem: Colors.White,
    text: Colors.DarkJungleGreen,
    text_placeholder: Colors.Snow,
    activeTincolor: Colors.Dark,
    inactiveBackgroundColor: Colors.Snow,
    activeBackgroundColor: Colors.TealBlue,
    backgroundHeader: Colors.White,
    tinColor: Colors.Dark,
    textCalender: Colors.DarkJungleGreen,
    borderColor: Colors.Isabelline,
    placeholder: Colors.GrayBlue,
  },
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

export const useTheme = (): IThemeContext => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return {
    theme,
    toggleTheme,
  };
};
