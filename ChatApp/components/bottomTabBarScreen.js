import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView, Dimensions, BackHandler, Text, View, Animated, TouchableOpacity, StatusBar, StyleSheet, } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import Svg, { Path } from 'react-native-svg';
import * as shape from "d3-shape";
import StaticTabbar from "./staticTabBarScreen";
import ChatScreen from "../screens/chat/chatScreen";
import CallsScreen from "../screens/calls/callsScreen";
import GroupsScreen from "../screens/groups/groupsScreen";
import MoreScreen from "../screens/more/moreScreen";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const height = 64;
const tabs = [
    {
        name: "chat-bubble-outline",
        title: 'Chat',
    },
    {
        name: "phone",
        title: 'Calls',
    },
    {
        name: "group",
        title: 'Groups',
    },
    {
        name: "more-horiz",
        title: 'More',
    },
];
const tabWidth = width / tabs.length;
const backgroundColor = Colors.primaryColor;

const getPath = () => {
    const left = shape.line().x(d => d.x).y(d => d.y)([
        { x: 0, y: 0 },
        { x: width, y: 0 },
    ]);
    const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
        { x: width, y: 0 },
        { x: width + 5, y: 0 },
        { x: width + 10, y: 10 },
        { x: width + 15, y: height },
        { x: width + tabWidth - 15, y: height },
        { x: width + tabWidth - 10, y: 10 },
        { x: width + tabWidth - 5, y: 0 },
        { x: width + tabWidth, y: 0 },
    ]);
    const right = shape.line().x(d => d.x).y(d => d.y)([
        { x: width + tabWidth, y: 0 },
        { x: width * 2, y: 0 },
        { x: width * 2, y: height },
        { x: 0, y: height },
        { x: 0, y: 0 },
    ]);
    return `${left} ${tab} ${right}`;
};

const d = getPath();


const BottomTabBar = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        currentIndex: 0,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount } = state;

    const value = useRef(new Animated.Value(0)).current;

    const translateX = value.interpolate({
        inputRange: [0, width],
        outputRange: [-width, 0],
    });

    const onChangeIndex = (index) => {
        updateState({ currentIndex: index })
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {
                currentIndex == 0 ?
                    <ChatScreen navigation={navigation} />
                    :
                    currentIndex == 1 ?
                        <CallsScreen navigation={navigation} />
                        :
                        currentIndex == 2 ?
                            <GroupsScreen navigation={navigation} />
                            :
                            <MoreScreen navigation={navigation} />
            }
            {tabDesign()}
            {
                backClickCount == 1
                    ?
                    <Animated.View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </Animated.View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function tabDesign() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor, position: 'absolute', left: 0.0, right: 0.0, bottom: 0.0 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    {...{ height, width }}
                >
                    <AnimatedSvg width={width * 2} {...{ height }} style={{ transform: [{ translateX }] }}>
                        <Path
                            d={d}
                            fill={backgroundColor}
                        />
                    </AnimatedSvg>
                    <View style={StyleSheet.absoluteFill}>
                        <StaticTabbar {...{ tabs, value, onChangeIndex }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default BottomTabBar;



