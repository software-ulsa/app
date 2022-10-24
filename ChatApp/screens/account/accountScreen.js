import React from "react";
import { SafeAreaView, View, StatusBar, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const AccountScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('Privacy')}
                >
                    {accountSettings({ title: 'Privacy', iconName: 'lock' })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('DeleteAccount')}
                >
                    {accountSettings({ title: 'Delete my account', iconName: 'delete' })}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

    function accountSettings({ title, iconName }) {
        return (
            <View style={styles.accountSettingsWrapStyle}>
                <MaterialIcons
                    name={iconName}
                    color={Colors.grayColor}
                    size={24}
                />
                <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Regular }}>
                    {title}
                </Text>
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
                    Account
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
    accountSettingsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding + 5.0
    }
})

export default AccountScreen;