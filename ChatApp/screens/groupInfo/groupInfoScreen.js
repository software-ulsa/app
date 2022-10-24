import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, StatusBar, TouchableOpacity, Image, TextInput, Text, StyleSheet, } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

const GroupInfoScreen = ({ navigation }) => {

    const [state, setState] = useState({
        groupNameFieldFocus: false,
        groupName: '',
        descriptionFieldFocus: false,
        description: '',
        showBottomSheet: false,
        groupDisplayImage: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        groupNameFieldFocus,
        groupName,
        descriptionFieldFocus,
        description,
        showBottomSheet,
        groupDisplayImage,
    } = state;

    const pickImageFromCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true
            })
            if (!result.cancelled) {
                updateState({ groupDisplayImage: result.uri })
            }
        }
    }

    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        })

        if (!result.cancelled) {
            updateState({ groupDisplayImage: result.uri })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
                    {addGroupImage()}
                    {groupNameTextField()}
                    {descriptionTextField()}
                </ScrollView>
                {nextFlatButton()}
            </View>
            {changeGroupImageSheet()}
        </SafeAreaView>
    )

    function nextFlatButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    navigation.push('BottomTabBar');
                }}
                style={styles.nextFlatButtonWrapStyle}>
                <MaterialIcons
                    name="arrow-forward"
                    size={27}
                    color={Colors.whiteColor}
                />
            </TouchableOpacity>
        )
    }

    function changeGroupImageSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => updateState({ showBottomSheet: false })}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: false })}
                    style={styles.bottomSheetWrapStyle}
                >
                    <Text style={{ ...Fonts.blackColor18Bold, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <View style={styles.bottomSheetDividerStyle} />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showBottomSheet: false })
                            pickImageFromCamera()
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-camera" size={24} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showBottomSheet: false })
                            pickImageFromGallery()
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding + 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={24} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
                            Choose from gallery
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function descriptionTextField() {
        return (
            <View style={{
                borderColor: descriptionFieldFocus ? Colors.primaryColor : '#E0E0E0',
                ...styles.textFieldStyle
            }}>
                <MaterialIcons
                    name="note"
                    size={24}
                    color={descriptionFieldFocus ? Colors.primaryColor : Colors.grayColor}
                />
                <TextInput
                    placeholder="Add description"
                    value={description}
                    onChangeText={(text) => updateState({ description: text })}
                    placeholderTextColor={Colors.grayColor}
                    style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor17Regular, flex: 1 }}
                    selectionColor={Colors.primaryColor}
                    onFocus={() => updateState({ descriptionFieldFocus: true })}
                    onBlur={() => updateState({ descriptionFieldFocus: false })}
                />
            </View>
        )
    }

    function groupNameTextField() {
        return (
            <View style={{
                borderColor: groupNameFieldFocus ? Colors.primaryColor : '#E0E0E0',
                ...styles.textFieldStyle,
            }}>
                <MaterialIcons
                    name="group"
                    size={24}
                    color={groupNameFieldFocus ? Colors.primaryColor : Colors.grayColor}
                />
                <TextInput
                    placeholder="Add group name"
                    value={groupName}
                    onChangeText={(text) => updateState({ groupName: text })}
                    placeholderTextColor={Colors.grayColor}
                    style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor17Regular, flex: 1 }}
                    selectionColor={Colors.primaryColor}
                    onFocus={() => updateState({ groupNameFieldFocus: true })}
                    onBlur={() => updateState({ groupNameFieldFocus: false })}
                />
            </View>
        )
    }

    function addGroupImage() {
        return (
            <>
                {
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showBottomSheet: true })}
                        style={{ ...styles.addGroupImageWrapStyle, borderColor: groupDisplayImage == null ? Colors.primaryColor : 'transparent', }}>
                        {
                            groupDisplayImage != null
                                ?
                                <Image
                                    source={{ uri: groupDisplayImage }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 50.0,
                                        alignSelf: 'center'
                                    }}
                                />
                                :
                                <MaterialIcons
                                    name="add-a-photo"
                                    size={30}
                                    color={Colors.primaryColor}
                                />
                        }
                    </TouchableOpacity>
                }
            </>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24}
                    color={Colors.whiteColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor19Medium }}>
                    Group info
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.primaryColor,
    },
    textFieldStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderWidth: 1.0,
        height: 55.0,
        paddingHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 2.0
    },
    addGroupImageWrapStyle: {
        borderWidth: 1.0,
        height: 100.0,
        width: 100.0,
        borderRadius: 50.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    bottomSheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding + 2.0,
        paddingBottom: Sizes.fixPadding + 2.0,
    },
    bottomSheetDividerStyle: {
        backgroundColor: '#e0e0e0',
        height: 0.50,
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding + 10.0
    },
    nextFlatButtonWrapStyle: {
        position: 'absolute',
        right: 20.0,
        bottom: 20.0,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        elevation: 5.0,
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default GroupInfoScreen;