import React from "react";
import { useFonts } from "expo-font";
import { View, Image } from "react-native";

import AppNavigation from "./src/navigation/AppNavigation";

export default function App() {
    let [fontsLoaded] = useFonts({
        Mulish_400Regular: require("./src/assets/fonts/Mulish-Regular.ttf"),
        Mulish_600SemiBold: require("./src/assets/fonts/Mulish-SemiBold.ttf"),
        Mulish_700Bold: require("./src/assets/fonts/Mulish-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return (
        <>
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "89%",
                }}
            >
                <Image
                    style={{
                        width: 200,
                        height: 400,
                    }}
                    source={{
                        uri: "http://www.kidlo.com/html5_games/loading_for_game.gif",
                    }}
                />
            </View>
        </>
        )
    } else {
        return <AppNavigation />;
    }
}
