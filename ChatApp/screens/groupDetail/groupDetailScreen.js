import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, ToastAndroid, Text, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';
import { SharedElement } from 'react-navigation-shared-element';

const groupParticipantsList = [
    {
        id: '1',
        image: require('../../assets/images/user_profile/user_3.jpg'),
        name: 'You',
        about: 'Your limitation-it\'s only your imagination.',
    },
    {
        id: '2',
        image: require('../../assets/images/user_profile/user_2.jpg'),
        name: 'John',
        isAdmin: true,
        about: 'Push yourself, because no one else is going to do it for you.',
    },
    {
        id: '3',
        image: require('../../assets/images/user_profile/user_1.jpg'),
        name: 'Jack Smith',
        about: 'Sometimes later becomes nevre. Do it now.',
    },
    {
        id: '4',
        image: require('../../assets/images/user_profile/user_4.jpg'),
        name: 'Appolinia',
        about: 'Great things never come from comfort zones.',
    },
    {
        id: '5',
        image: require('../../assets/images/user_profile/user_5.jpg'),
        name: 'Alexander',
        about: 'Dream it. Wish it. Do it.',
    },
];

const GroupDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [state, setState] = useState({
        showOptions: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { showOptions } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {groupDisplayImage()}
                    {participantsInfo()}
                    {reportGroupInfo()}
                    {exitGroupInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function exitGroupInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BottomTabBar')}
                style={styles.exitGroupInfoWrapStyle}>
                <MaterialIcons
                    name="exit-to-app"
                    color={Colors.primaryColor}
                    size={24}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor15Regular }}>
                    Exit group
                </Text>
            </TouchableOpacity>
        )
    }

    function reportGroupInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    ToastAndroid.showWithGravity(
                        "Report",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                }}
                style={styles.reportGroupInfoWrapStyle}>
                <MaterialIcons
                    name="thumb-down"
                    color={Colors.primaryColor}
                    size={24}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor15Regular }}>
                    Report group
                </Text>
            </TouchableOpacity>
        )
    }

    function participantsInfo() {
        return (
            <>
                <View style={{
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    paddingTop: Sizes.fixPadding * 2.0,
                    backgroundColor: Colors.whiteColor,
                }}>
                    <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.grayColor15Regular }}>
                        {groupParticipantsList.length} participants
                    </Text>
                    {
                        groupParticipantsList.map((item) => (
                            <View key={`${item.id}`}>
                                <View style={{ marginBottom: Sizes.fixPadding + 10.0, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={item.image}
                                        style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                                    />
                                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ ...Fonts.blackColor15Regular }}>
                                                {item.name}
                                            </Text>
                                            {
                                                item.isAdmin ?
                                                    <View style={styles.adminButtonWrapStyle}>
                                                        <Text style={{ ...Fonts.primaryColor12Regular }}>
                                                            admin
                                                        </Text>
                                                    </View>
                                                    :
                                                    null
                                            }
                                        </View>
                                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor12Regular }}>
                                            {item.about}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </>
        )
    }

    function groupDisplayImage() {
        return (
            <View style={styles.groupDisplayImageWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('DisplayImageFullView', { item: item })}
                >
                    <SharedElement id={item.id}>
                        <Image
                            source={item.image}
                            style={{ alignSelf: 'center', width: 140.0, height: 140.0, borderRadius: 70.0 }}
                        />
                    </SharedElement>
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={40}
                    color={Colors.whiteColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.whiteColor19Medium }}>
                    {item.name}
                </Text>
                <Menu
                    visible={showOptions}
                    style={{ paddingTop: Sizes.fixPadding }}
                    anchor={
                        <MaterialIcons
                            name="more-vert"
                            size={24}
                            color={Colors.whiteColor}
                            onPress={() => updateState({ showOptions: true })}
                        />
                    }
                    onRequestClose={() => updateState({ showOptions: false })}
                >
                    <MenuItem
                        textStyle={{ ...Fonts.blackColor16Regular }}
                        onPress={() => {
                            updateState({ showOptions: false })
                            ToastAndroid.showWithGravity(
                                "Edit",
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                            );
                        }}
                    >
                        Edit
                    </MenuItem>
                    <MenuItem
                        textStyle={{ marginTop: Sizes.fixPadding - 20.0, ...Fonts.blackColor16Regular }}
                        onPress={() => {
                            updateState({ showOptions: false })
                            ToastAndroid.showWithGravity(
                                "Report",
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                            );
                        }}
                    >
                        Report
                    </MenuItem>
                    <MenuItem
                        textStyle={{ marginTop: Sizes.fixPadding - 20.0, ...Fonts.blackColor16Regular }}
                        onPress={() => {
                            updateState({ showOptions: false })
                            navigation.push('BottomTabBar')
                        }}
                    >
                        Exit group
                    </MenuItem>
                </Menu>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: Sizes.fixPadding - 5.0,
        paddingRight: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.primaryColor,
        height: 56.0,
    },
    groupDisplayImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.5,
        marginBottom: Sizes.fixPadding
    },
    adminButtonWrapStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding - 7.0
    },
    reportGroupInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Sizes.fixPadding,
    },
    exitGroupInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
    }
})

export default GroupDetailScreen;