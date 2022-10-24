import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

const DeleteAccountScreen = ({ navigation }) => {

    const [state, setState] = useState({
        isDeleteDialog: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { isDeleteDialog, } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {deleteInfo()}
                {divider()}
                {deleteAccountButton()}
                {deleteAccountDialog()}
            </View>
        </SafeAreaView>
    )

    function deleteAccountDialog() {
        return (
            <Dialog.Container
                visible={isDeleteDialog}
                headerStyle={{ margin: 0.0 }}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        Are yo sure want to delete your account?
                    </Text>
                    <View style={styles.cancelAndDeleteButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ isDeleteDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor16Regular }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                updateState({ isDeleteDialog: false })
                                navigation.push('Welcome')
                            }}
                            style={styles.deleteButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Regular }}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function deleteAccountButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ isDeleteDialog: true })}
                style={styles.deleteAccountButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Regular }}>
                    DELETE MY ACCOUNT
                </Text>
            </TouchableOpacity>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: '#e0e0e0',
                height: 1.0,
                marginVertical: Sizes.fixPadding * 2.0,
            }} />
        )
    }

    function deleteInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 10.0, flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <MaterialCommunityIcons name="alert" size={24} color={Colors.redColor} />
                <View style={{ marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 3.0, ...Fonts.redColor17Medium }}>
                        Delete your account will:
                    </Text>
                    <Text style={{ maxWidth: width - 80, ...Fonts.grayColor13Regular }}>
                        - Delete your account from ChatApp
                    </Text>
                    <Text style={{ maxWidth: width - 80, marginVertical: Sizes.fixPadding - 3.0, ...Fonts.grayColor13Regular }}>
                        - Erase your message history
                    </Text>
                    <Text style={{ maxWidth: width - 80, ...Fonts.grayColor13Regular }}>
                        - Delete you from all of your ChatApp groups
                    </Text>
                </View>
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
                    Delete my account
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
    deleteAccountButtonStyle: {
        alignSelf: 'flex-start',
        backgroundColor: '#C62828',
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 8.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    dialogContainerStyle: {
        width: width - 80,
        padding: Sizes.fixPadding * 2.0,
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#C5C5C5',
        borderRadius: Sizes.fixPadding - 8.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
    },
    deleteButtonStyle: {
        flex: 0.50,
        backgroundColor: '#C62828',
        borderRadius: Sizes.fixPadding - 8.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    cancelAndDeleteButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding + 10.0,
    }
})

export default DeleteAccountScreen;