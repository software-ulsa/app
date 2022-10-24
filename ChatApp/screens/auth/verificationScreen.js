import React, { createRef, useState } from "react";
import { SafeAreaView, View, ScrollView, StatusBar, TouchableOpacity, StyleSheet, Dimensions, Text, TextInput } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';

const { width } = Dimensions.get('screen');

const VerificationScreen = ({ navigation }) => {

    const [state, setState] = useState({
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        isLoading,
        firstDigit,
        secondDigit,
        thirdDigit,
        forthDigit,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, marginVertical: Sizes.fixPadding * 2.0, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {verifyTitle()}
                    {otpInfo()}
                    {otpFields()}
                </ScrollView>
                {goNextFlatButton()}
            </View>
            {loading()}
        </SafeAreaView>
    )

    function goNextFlatButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({ isLoading: true })
                    setTimeout(() => {
                        updateState({ isLoading: false })
                        navigation.push('BottomTabBar');
                    }, 2000);
                }}
                style={styles.goNextFlatButtonWrapStyle}
            >
                <MaterialIcons name="arrow-forward" size={25} color={Colors.whiteColor} />
            </TouchableOpacity>
        )
    }

    function loading() {
        return (
            <Dialog.Container
                visible={isLoading}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={40} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor15Regular,
                        marginTop: Sizes.fixPadding * 3.0
                    }}>
                        Please Wait..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    function otpFields() {

        const secondTextInput = createRef();
        const thirdTextInput = createRef();
        const forthTextInput = createRef();

        return (
            <View style={styles.otpFieldsWrapStyle}>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={firstDigit}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding - 2.0 }}
                        onChangeText={(text) => {
                            updateState({ firstDigit: text })
                            secondTextInput.current.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={secondDigit}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding - 2.0 }}
                        ref={secondTextInput}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            updateState({ secondDigit: text })
                            thirdTextInput.current.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding - 2.0 }}
                        keyboardType="numeric"
                        value={thirdDigit}
                        ref={thirdTextInput}
                        onChangeText={(text) => {
                            updateState({ thirdDigit: text })
                            forthTextInput.current.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding - 2.0 }}
                        keyboardType="numeric"
                        value={forthDigit}
                        ref={forthTextInput}
                        onChangeText={(text) => {
                            updateState({ forthDigit: text })
                            updateState({ isLoading: true })
                            setTimeout(() => {
                                updateState({ isLoading: false })
                                navigation.push('BottomTabBar');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    function otpInfo() {
        return (
            <Text style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.grayColor15Regular }}>
                Enter the OTP sent to your mobile number
            </Text>
        )
    }

    function verifyTitle() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0, ...Fonts.blackColor18Bold }}>
                Verify details
            </Text>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color="black"
                onPress={() => navigation.pop()}
                style={{ marginHorizontal: Sizes.fixPadding + 5.0, }}
            />
        )
    }
}

const styles = StyleSheet.create({
    otpFieldsWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    textFieldWrapStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(179, 77, 77, 0.30)',
        borderWidth: 1.0,
        elevation: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingVertical: Sizes.fixPadding * 3.0,
    },
    goNextFlatButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        right: 20.0,
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
    }
})

export default VerificationScreen;