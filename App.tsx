import "react-native-gesture-handler";
import React, { useCallback, useMemo, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import RootStack from "navigation";
import { Provider } from "react-redux";
import ModalDisconnect from "components/ModalDisconnect";
import { StatusBar, View } from "react-native";
import Theme from "style/Theme";
import { store } from "redux/reducer";
import { useFonts } from "expo-font";
import { TMode, themes, ThemeContext } from "configs/Theme";

export default function App() {
  const [mode, setMode] = useState<TMode>("dark");

  const toggleTheme = useCallback(() => {
    setMode((prevMode: string) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(() => (mode === "light" ? themes.dark : themes.light), [
    mode,
  ]);
  let [loaded] = useFonts({
    "Muli-400Regular": require("./assets/fonts/Muli-400Regular.ttf"),
    "Muli-600SemiBold": require("./assets/fonts/Muli-600SemiBold.ttf"),
    "Mulish-Bold": require("./assets/fonts/Mulish-Bold.ttf"),
    "Mulish-Medium": require("./assets/fonts/Mulish-Medium.ttf"),
    "Mulish-Regular": require("./assets/fonts/Mulish-Regular.ttf"),
    "Mulish-SemiBold": require("./assets/fonts/Mulish-SemiBold.ttf"),
    "Oswald-Bold": require("./assets/fonts/Oswald-Bold.ttf"),
    "Oswald-Medium": require("./assets/fonts/Oswald-Medium.ttf"),
    "Oswald-Regular": require("./assets/fonts/Oswald-Regular.ttf"),
    "Oswald-SemiBold": require("./assets/fonts/Oswald-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const isDisconnect = false;

  return (
    <View style={Theme.flexOne}>
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <StatusBar
            barStyle={mode === "light" ? "light-content" : "dark-content"}
          />
          <NavigationContainer
            theme={{
              dark: false,
              colors: {
                ...DefaultTheme.colors,
                background: theme.background,
              },
            }}
          >
            <RootStack />
          </NavigationContainer>
          {isDisconnect && <ModalDisconnect />}
        </ThemeContext.Provider>
      </Provider>
    </View>
  );
}
