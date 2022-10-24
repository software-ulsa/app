import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from "@rneui/themed";
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('screen');

const ProfileScreen = ({ navigation, route }) => {

    const id = route.params.id;

    const [state, setState] = useState({
        editNameSheet: false,
        currentName: 'Ellison Perry',
        changingName: 'Ellison Perry',
        nameFieldFocus: false,
        editAboutSheet: false,
        currentAbout: 'Push yourself, because no one else is going to do it for you.',
        changingAbout: 'Push yourself, because no one else is going to do it for you.',
        aboutFieldFocus: false,
        editDisplayImageSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        editNameSheet,
        currentName,
        changingName,
        nameFieldFocus,
        editAboutSheet,
        currentAbout,
        changingAbout,
        aboutFieldFocus,
        editDisplayImageSheet,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {displayImageWithChangeOption()}
                {nameInfo()}
                {aboutInfo()}
                {phoneInfo()}
                {editNameBottomSheet()}
                {editAboutBottomSheet()}
                {editDisplayImageBottomSheet()}
            </View>
        </SafeAreaView>
    )

    function editDisplayImageBottomSheet() {
        return (
            <BottomSheet
                isVisible={editDisplayImageSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => updateState({ editDisplayImageSheet: false })}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.bottomSheetWrapStyle}
                    onPress={() => updateState({ editDisplayImageSheet: false })}
                >
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        Profile photo
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', justifyContent: 'flex-start', }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ editDisplayImageSheet: false })}
                            style={{ alignItems: 'center' }}>
                            <View style={{ backgroundColor: Colors.redColor, ...styles.changeDisplayImageOptionsWrapStyle }} >
                                <MaterialIcons
                                    name="delete"
                                    color={Colors.whiteColor}
                                    size={24}
                                />
                            </View>
                            <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                                {`Remove\nphoto`}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ editDisplayImageSheet: false })}
                            style={{ marginHorizontal: Sizes.fixPadding * 4.0, alignItems: 'center' }}>
                            <View style={{ backgroundColor: Colors.lightBlueColor, ...styles.changeDisplayImageOptionsWrapStyle }} >
                                <MaterialIcons
                                    name="photo-album"
                                    color={Colors.whiteColor}
                                    size={22}
                                />
                            </View>
                            <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                                Gallery
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ editDisplayImageSheet: false })}
                            style={{ alignItems: 'center' }}>
                            <View style={{ backgroundColor: Colors.orangeColor, ...styles.changeDisplayImageOptionsWrapStyle }} >
                                <MaterialIcons
                                    name="camera-alt"
                                    color={Colors.whiteColor}
                                    size={24}
                                />
                            </View>
                            <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                                Camera
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </BottomSheet >
        )
    }

    function editAboutBottomSheet() {
        return (
            <BottomSheet
                isVisible={editAboutSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => updateState({ editAboutSheet: false })}
            >
                <View
                    activeOpacity={0.9}
                    style={styles.bottomSheetWrapStyle}
                >
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        About
                    </Text>
                    <TextInput
                        value={currentAbout}
                        onChangeText={(text) => updateState({ currentAbout: text })}
                        style={{ flex: 1, paddingBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding + 5.0, borderBottomColor: aboutFieldFocus ? Colors.primaryColor : '#e0e0e0', borderBottomWidth: 1.0, ...Fonts.blackColor15Regular }}
                        selectionColor={Colors.primaryColor}
                        onFocus={() => updateState({ aboutFieldFocus: true })}
                        onBlur={() => updateState({ aboutFieldFocus: false })}
                    />
                    <View style={styles.bottomSheetCancelAndSaveWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ editAboutSheet: false, currentAbout: changingAbout })}
                        >
                            <Text style={{ ...Fonts.primaryColor17Medium }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ editAboutSheet: false, changingAbout: currentAbout })}
                        >
                            <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.primaryColor17Medium }}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
        )
    }

    function editNameBottomSheet() {
        return (
            <BottomSheet
                isVisible={editNameSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => updateState({ editNameSheet: false })}
            >
                <View
                    activeOpacity={0.9}
                    style={styles.bottomSheetWrapStyle}
                >
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        Enter your name
                    </Text>
                    <TextInput
                        value={currentName}
                        onChangeText={(text) => updateState({ currentName: text })}
                        style={{
                            paddingBottom: Sizes.fixPadding - 2.0,
                            marginTop: Sizes.fixPadding + 5.0,
                            borderBottomColor: nameFieldFocus ? Colors.primaryColor : '#e0e0e0',
                            borderBottomWidth: 1.0,
                            ...Fonts.blackColor15Regular
                        }}
                        selectionColor={Colors.primaryColor}
                        onFocus={() => updateState({ nameFieldFocus: true })}
                        onBlur={() => updateState({ nameFieldFocus: false })}
                    />
                    <View style={styles.bottomSheetCancelAndSaveWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ editNameSheet: false, currentName: changingName })}
                        >
                            <Text style={{ ...Fonts.primaryColor17Medium }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ editNameSheet: false, changingName: currentName })}
                        >
                            <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.primaryColor17Medium }}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
        )
    }

    function phoneInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: Sizes.fixPadding * 2.0
            }}>
                <MaterialIcons
                    name="phone"
                    size={24}
                    color={Colors.grayColor}
                />
                <View style={{ marginLeft: Sizes.fixPadding * 2.0 }}>
                    <Text style={{ ...Fonts.grayColor13Regular }}>
                        Phone
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor16Regular }}>
                        +1 12345678
                    </Text>
                </View>
            </View>
        )
    }

    function aboutInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ editAboutSheet: true })}
            >
                <View style={styles.aboutInfoWrapStyle}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <MaterialIcons
                            name="info-outline"
                            color={Colors.grayColor}
                            size={24}
                        />
                        <View style={{ marginLeft: Sizes.fixPadding + 5.0 }}>
                            <Text style={{ ...Fonts.grayColor13Regular }}>
                                About
                            </Text>
                            <Text style={{ maxWidth: width / 1.5, marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor15Regular }}>
                                {changingAbout}
                            </Text>
                        </View>
                    </View>
                    <MaterialIcons
                        name="edit"
                        color={Colors.grayColor}
                        size={22}
                    />
                </View>
                {divider()}
            </TouchableOpacity>
        )
    }

    function nameInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ editNameSheet: true })}
            >
                <View style={styles.nameInfoWrapStyle}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <MaterialIcons
                            name="person"
                            color={Colors.grayColor}
                            size={24}
                        />
                        <View style={{ marginLeft: Sizes.fixPadding + 5.0 }}>
                            <Text style={{ ...Fonts.grayColor13Regular }}>
                                Name
                            </Text>
                            <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor15Regular }}>
                                {changingName}
                            </Text>
                        </View>
                    </View>
                    <MaterialIcons
                        name="edit"
                        color={Colors.grayColor}
                        size={22}
                    />
                </View>
                <Text style={{ marginRight: Sizes.fixPadding * 2.0, marginLeft: Sizes.fixPadding * 6.0, marginTop: Sizes.fixPadding - 4.0, ...Fonts.grayColor12Regular }}>
                    This is your username or pin. This name will be visible to your ChatApp contacts.
                </Text>
                {divider()}
            </TouchableOpacity>
        )
    }

    function divider() {
        return (
            <View
                style={{
                    marginLeft: Sizes.fixPadding * 6.0,
                    backgroundColor: '#e0e0e0',
                    height: 1.0,
                    marginVertical: Sizes.fixPadding * 2.0
                }}
            />
        )
    }

    function displayImageWithChangeOption() {
        return (
            <View style={{ alignSelf: 'center', marginVertical: Sizes.fixPadding * 2.0 }}>
                <SharedElement id={id}>
                    <Image
                        source={require('../../assets/images/user_profile/user_3.jpg')}
                        style={styles.userImageStyle}
                    />
                </SharedElement>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ editDisplayImageSheet: true })}
                    style={styles.changeOptionsIconWrapStyle}>
                    <MaterialIcons
                        name="camera-alt"
                        color={Colors.whiteColor}
                        size={22}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.whiteColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor19Medium }}>
                    Profile
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        height: 56.0,
        paddingHorizontal: Sizes.fixPadding + 5.0
    },
    changeOptionsIconWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        right: 0.0,
        backgroundColor: Colors.primaryColor,
        width: 45.0,
        height: 45.0,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    userImageStyle: {
        width: 140.0,
        height: 140.0,
        borderRadius: 70.0,
        alignSelf: 'center',
    },
    aboutInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    bottomSheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding * 2.0,
    },
    bottomSheetCancelAndSaveWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: Sizes.fixPadding + 10.0
    },
    nameInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    changeDisplayImageOptionsWrapStyle: {
        borderRadius: 25.0,
        height: 50.0,
        width: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ProfileScreen;