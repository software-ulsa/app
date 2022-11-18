import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS, FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export default function Button({ title, containerStyle, onPress, icon }) {
    return (
        <TouchableOpacity
            style={{
                height: 50,
                backgroundColor: COLORS.golden,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                ...containerStyle,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    textAlign: "center",
                    ...FONTS.Mulish_600SemiBold,
                    fontSize: 16,
                    textTransform: "uppercase",
                }}
            >
                {title}
            </Text>
            {icon ? <Ionicons style={{marginHorizontal:5}} name="md-checkmark" size={35} color="white" /> :<></>}
        </TouchableOpacity>
    );
}
