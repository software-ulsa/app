import React from "react";
import { SafeAreaView, View, StatusBar, Image } from "react-native";
import { Colors } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';

const DisplayImageFullViewScreen = ({ navigation, route }) => {

    const item = route.params.item;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackColor }}>
            <StatusBar backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {closeButton()}
                {displayImage()}
            </View>
        </SafeAreaView>
    )

    function displayImage() {
        return (
            <SharedElement id={item.id}>
                <Image
                    source={item.image}
                    style={{
                        width: '100%',
                        height: 350.0,
                    }}
                />
            </SharedElement>
        )
    }

    function closeButton() {
        return (
            <MaterialIcons
                name="close"
                size={24}
                color={Colors.whiteColor}
                style={{
                    position: 'absolute',
                    left: 20.0,
                    top: 20.0,
                }}
                onPress={() => navigation.pop()}
            />
        )
    }
}

export default DisplayImageFullViewScreen;