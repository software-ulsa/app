import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { Dimensions, Image, SafeAreaView, StatusBar, View } from "react-native";
import { SharedElement } from 'react-navigation-shared-element';
import { Colors } from "../../constants/styles";

const { height, width } = Dimensions.get('screen');

const AttachmentFullViewScreen = ({ navigation, route }) => {

    const item = route.params.item;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackColor }}>
            <StatusBar backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {closeButton()}
                {attachment()}
            </View>
        </SafeAreaView>
    )

    function attachment() {
        return (
            <SharedElement id={item.id}>
                <Image
                    source={item.image}
                    style={{
                        width: width,
                        height: height - 250,
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

export default AttachmentFullViewScreen;