import { View, Text, TextInput } from "react-native";
import React from "react";

import { COLORS } from "../constants";

export default function InputField({
  placeholder,
  containerStyle,
  fontStyle = "normal",
  icon,
  ...props
}) {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 25,
        borderColor: COLORS.goldenTransparent_03,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...containerStyle,
        backgroundColor: COLORS.goldenTransparent_01,
      }}
    >
      <TextInput
        placeholder={placeholder}
        style={{ flex: 1, paddingRight: 15, fontStyle: fontStyle }}
        {...props}
      />
      {icon && icon}
    </View>
  );
}
