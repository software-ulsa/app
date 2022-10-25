import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableOpacity, Image, TextInput, SafeAreaView, StatusBar, } from "react-native";
import { Fonts, Colors, Sizes, } from "./styles";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from "@rneui/themed";
import { Menu, MenuItem } from 'react-native-material-menu';
import { SharedElement } from 'react-navigation-shared-element';
import { COLORS } from "../constants";

const { width } = Dimensions.get('screen');

const userMessages = [
    {
        id: '1',
        message: 'Hello',
        time: '9:35 AM',
        isSender: false,
    },
    {
        id: '2',
        message: 'Hi',
        time: '9:35 AM',
        isSender: true,
        isSeen: true,
    },
    {
        id: '3',
        message: 'How are you?',
        time: '9:36 AM',
        isSender: false,
    },
    {
        id: '4',
        message: 'I\'m fine.How are you?',
        time: '9:38 AM',
        isSender: true,
        isSeen: true,
    },
    {
        id: '5',
        attachmentType: 'gallery',
        image: require('../assets/images/logopeque.png'),
        time: '9:40 AM',
        isSender: false,
    },
    {
        id: '6',
        message: 'Wow',
        time: '9:41 AM',
        isSender: true,
        isSeen: true,
    },
    {
        id: '7',
        attachmentType: 'contact',
        contactName: 'Chris Hemsworth',
        time: '9:42 AM',
        isSender: true,
        isSeen: false,
    },
];

const MessagesScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [state, setState] = useState({
        showOptions: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { showOptions } = state;

    const [showAttachmentSheet, setShowAttachmentSheet] = useState(false);

    const [messagesList, setMessagesList] = useState(userMessages);

    function messages() {

        const renderItem = ({ item }) => {
            return (
                <View style={{
                    alignItems: item.isSender == true ? 'flex-end' : 'flex-start',
                    marginHorizontal: Sizes.fixPadding,
                    marginVertical: Sizes.fixPadding - 5.0,
                }}>
                    {
                        item.message == null
                            ?
                            item.attachmentType == 'gallery' ?
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => navigation.push('AttachmentFullView', { item })}
                                >
                                    <SharedElement id={item.id}>
                                        <Image
                                            source={item.image}
                                            style={{
                                                width: 150.0,
                                                height: 150.0,
                                                borderRadius: Sizes.fixPadding - 5.0,
                                                borderWidth: 2.0,
                                                borderColor: Colors.whiteColor,
                                            }}
                                        />
                                    </SharedElement>
                                </TouchableOpacity>
                                :
                                item.attachmentType == 'contact'
                                    ?
                                    <View style={{
                                        ...styles.messageWrapStyle,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: item.isSender == true ? Colors.primaryColor : Colors.whiteColor,
                                    }}>
                                        <MaterialIcons
                                            name="group-add"
                                            color={Colors.whiteColor}
                                            size={25}
                                        />
                                        <View style={{ marginHorizontal: Sizes.fixPadding + 2.0, backgroundColor: Colors.whiteColor, height: 10.0, width: 1.0, }} />
                                        <Text style={item.isSender ? { ...Fonts.whiteColor16Regular } : { ...Fonts.primaryColor16Regular }}>
                                            {item.contactName}
                                        </Text>
                                    </View>
                                    : null
                            :
                            < View style={{
                                ...styles.messageWrapStyle,
                                backgroundColor: item.isSender == true ? Colors.primaryColor : Colors.whiteColor,
                            }}>
                                <Text style={item.isSender ? { ...Fonts.whiteColor16Regular } : { ...Fonts.primaryColor16Regular }}>
                                    {item.message}
                                </Text>
                            </View>
                    }
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: Sizes.fixPadding - 5.0,
                    }}>
                        {item.isSender == true ?
                            item.isSeen == true ?
                                <Ionicons name="checkmark-done-sharp" size={18} color={Colors.grayColor} />
                                :
                                <Ionicons name="checkmark-sharp" size={18} color={Colors.grayColor} />
                            : null
                        }
                        <Text style={{
                            marginLeft: Sizes.fixPadding - 5.0,
                            ...Fonts.grayColor13Regular,
                        }}>
                            {item.time}
                        </Text>
                    </View>
                </View >
            )
        }

        return (
            <FlatList
                inverted
                data={messagesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: Sizes.fixPadding * 2.0,
                    flexDirection: 'column-reverse',
                }}
            />
        )
    }

    function addMessage({ message }) {

        const oldMessages = messagesList;
        let date = Date();
        let hour = (new Date(date)).getHours();
        let minute = (new Date(date)).getMinutes();
        let AmPm = hour >= 12 ? 'PM' : 'AM';
        let finalhour = hour > 12 ? (hour - 12) : hour;

        const newMessage = {
            id: messagesList.length + 1,
            message: message,
            time: `${finalhour}:${minute} ${AmPm}`,
            isSender: true,
            isSeen: false,
        }

        oldMessages.push(newMessage);
        setMessagesList(oldMessages);
    }

    function typeMessage() {
        const [message, setMessage] = useState('');
        return (
            <View style={styles.bottomWrapStyle}>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={message}
                        onChangeText={setMessage}
                        placeholder='Type a Message'
                        style={{ ...Fonts.whiteColor14Regular }}
                        placeholderTextColor={Colors.whiteColor}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowAttachmentSheet(true)}
                    style={styles.sendAndAttachButtonStyle}
                >
                    <MaterialIcons
                        name="attach-file"
                        size={20}
                        color={Colors.yellowColor}
                    />
                </TouchableOpacity>
                <View style={styles.sendAndAttachButtonStyle}>
                    <MaterialCommunityIcons name="send" size={24}
                        color={Colors.yellowColor}
                        onPress={() => {
                            if (message != '') {
                                addMessage({ message: message })
                                setMessage('');
                            }
                        }}
                    />
                </View>
            </View>
        )
    }

    function attachmentBottomSheet() {
        return (
            <BottomSheet
                isVisible={showAttachmentSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => setShowAttachmentSheet(false)}
            >
                <View
                    activeOpacity={0.9}
                    style={styles.bottomSheetWrapStyle}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {attachmentOptions(
                            {
                                attachmentType: 'Document',
                                iconName: 'note-add',
                                backgroundColor: Colors.lightBlueColor
                            }
                        )}
                        {attachmentOptions(
                            {
                                attachmentType: 'Payment',
                                iconName: 'attach-money',
                                backgroundColor: Colors.cyanColor
                            }
                        )}
                        {attachmentOptions(
                            {
                                attachmentType: 'Gallery',
                                iconName: 'insert-photo',
                                backgroundColor: Colors.redColor
                            }
                        )}
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: Sizes.fixPadding * 2.0,
                    }}>
                        {attachmentOptions(
                            {
                                attachmentType: 'Audio',
                                iconName: 'audiotrack',
                                backgroundColor: Colors.purpleColor,
                            }
                        )}
                        {attachmentOptions(
                            {
                                attachmentType: 'Location',
                                iconName: 'location-on',
                                backgroundColor: Colors.orangeColor,
                            }
                        )}
                        {attachmentOptions(
                            {
                                attachmentType: 'Contact',
                                iconName: 'person',
                                backgroundColor: Colors.darkBlueColor
                            }
                        )}
                    </View>
                </View>
            </BottomSheet>
        )
    }

    function attachmentOptions({ attachmentType, iconName, backgroundColor }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowAttachmentSheet(false)}
                    style={{ ...styles.attachmentOptionsWrapStyle, backgroundColor, }}>
                    <MaterialIcons
                        name={iconName}
                        color={Colors.whiteColor}
                        size={25}
                    />
                </TouchableOpacity>
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor13Regular }}>
                    {attachmentType}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar backgroundColor={COLORS.goldenTransparent_01} />
            <View style={{ flex: 1 }}>
                <ImageBackground
                    style={{ flex: 1, backgroundColor:COLORS.goldenTransparent_03 }}
                    //source={require('../../assets/images/chat_bg.jpg')}
                    resizeMode="cover"
                    blurRadius={2}
                >
                    {header()}
                    <View style={{ flex: 1, }}>
                        {messages()}
                        {typeMessage()}
                        {attachmentBottomSheet()}
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={40}
                        color={Colors.whiteColor}
                        onPress={() => navigation.goBack()}
                    />
                    <Image
                        source={{uri:''}}
                        style={{ marginLeft: Sizes.fixPadding, width: 50.0, height: 50.0, borderRadius: 25.0 }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('ChatDetail', { item: item })}
                        style={{ maxWidth: width / 3.0, marginLeft: Sizes.fixPadding }}
                    >
                        <Text style={{ ...Fonts.whiteColor17Medium }}>
                            {}Maestro Rossi
                        </Text>
                        <Text style={{ marginTop: Sizes.fixPadding - 8.0, ...Fonts.whiteColor14Regular }}>
                            Online
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <MaterialIcons
                        name="phone"
                        size={24}
                        color={Colors.whiteColor}
                        onPress={() => navigation.push('Calling', { item: item })}
                    />
                    <MaterialIcons
                        name="videocam"
                        size={24}
                        color={Colors.whiteColor}
                        style={{ marginHorizontal: Sizes.fixPadding + 10.0 }}
                        onPress={() => navigation.push('VideoCalling', { item: item })}
                    />
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
                            onPress={() => updateState({ showOptions: false })}>
                            Report
                        </MenuItem>
                        <MenuItem
                            textStyle={{ marginTop: Sizes.fixPadding - 20.0, ...Fonts.blackColor16Regular }}
                            onPress={() => updateState({ showOptions: false })}>
                            Block
                        </MenuItem>
                    </Menu>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: Sizes.fixPadding,
        justifyContent: 'space-between',
    },
    messageWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    },
    bottomWrapStyle: {
        flexDirection: 'row',
        marginBottom: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding,
    },
    textFieldWrapStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.27)',
        borderRadius: Sizes.fixPadding,
        height: 50.0,
        justifyContent: 'center',
        flex: 1,
        paddingLeft: Sizes.fixPadding,
    },
    sendAndAttachButtonStyle: {
        height: 44.0,
        width: 44.0,
        borderRadius: 22.0,
        backgroundColor: 'rgba(255, 255, 255, 0.20)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding,
    },
    bottomSheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        margin: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding * 3.0,
    },
    attachmentOptionsWrapStyle: {
        borderRadius: 30.0,
        height: 60.0,
        width: 60.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default MessagesScreen;