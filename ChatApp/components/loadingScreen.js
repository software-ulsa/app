import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Rubik_Light: require("../assets/fonts/rubik/Rubik-Light.ttf"),
                Rubik_Medium: require("../assets/fonts/rubik/Rubik-Medium.ttf"),
                Rubik_Regular: require("../assets/fonts/rubik/Rubik-Regular.ttf"),
            });
            navigation.navigate('Welcome');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;





