import React, { useState, useCallback } from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, BackHandler, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

const WelcomeScreen = ({ navigation }) => {
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
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={styles.pageStyle}>
                <View>
                    <Text style={{ marginBottom: Sizes.fixPadding * 5.0, textAlign: 'center', ...Fonts.primaryColor26Regular }}>
                        Welcome to ChatApp
                    </Text>
                    {welcomeLogo()}
                </View>
                <View>
                    {privacyPolicyAndTermsOfUseInfo()}
                    {agreeAndContinueButton()}
                </View>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function agreeAndContinueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Signin')}
                style={styles.agreeAndContinueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Light }}>
                    AGREE AND CONTINUE
                </Text>
            </TouchableOpacity>
        )
    }

    function privacyPolicyAndTermsOfUseInfo() {
        return (
            <Text style={styles.privacyPolicyAndTermsOfUseInfoWrapStyle}>
                {`Read our `}
                <Text
                    onPress={() => navigation.push('PrivacyPolicy')}
                    style={{ ...Fonts.lightBlueColor15Regular }}
                >
                    Privacy Policy
                </Text>
                {`. Tap "Agree and continue" to \n accept the `}
                <Text
                    onPress={() => navigation.push('TermsOfUse')}
                    style={{ ...Fonts.lightBlueColor15Regular }}
                >
                    Terms of Service.
                </Text>
            </Text>
        )
    }

    function welcomeLogo() {
        return (
            <View style={styles.welcomeLogoWrapStyle}>
                <MaterialCommunityIcons name="whatsapp" size={140} color={Colors.whiteColor} />
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
    pageStyle: {
        marginBottom: Sizes.fixPadding * 7.0,
        marginTop: Sizes.fixPadding * 3.0,
        flex: 1,
        justifyContent: 'space-between'
    },
    agreeAndContinueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 4.0,
        marginTop: Sizes.fixPadding * 4.0,
    },
    privacyPolicyAndTermsOfUseInfoWrapStyle: {
        lineHeight: 26.0,
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        ...Fonts.grayColor15Regular
    },
    welcomeLogoWrapStyle: {
        backgroundColor: '#CC8989',
        width: 240.0,
        height: 240.0,
        borderRadius: 120.0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})

export default WelcomeScreen;