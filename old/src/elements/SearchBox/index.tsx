import React, { Dispatch, memo, SetStateAction } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ViewStyle,
  ColorValue,
} from "react-native";
import Theme from "style/Theme";
import { Colors } from "configs";
import { ICON } from "images/Icon";
import Layout from "elements/Layout/Layout";
import Container from "elements/Layout/Container";
import { useTheme } from "configs/Theme";

interface SearchBoxProps {
  value?: string;
  onChangeText?: (text: string) => void | Dispatch<SetStateAction<string>>;
  placeholder: string;
  borderColor?: boolean;
  backgroundColor?: string;
  style?: ViewStyle;
  onSubmitEditing?: () => void;
  shadow?: boolean;
  autoFocus?: boolean;
  placeholderTextColor?: ColorValue | string;
}

const SearchBox = memo(
  ({
    value,
    onChangeText,
    onSubmitEditing,
    placeholder,
    borderColor,
    style,
    backgroundColor,
    shadow = true,
    placeholderTextColor,
    ...props
  }: SearchBoxProps) => {
    const { theme } = useTheme();
    return (
      <View
        style={[
          styles.container,
          style && style,
          {
            borderColor: borderColor ? theme.borderColor : Colors.White,
            backgroundColor: theme.backgroundItem,
          },
        ]}
      >
        <Image source={ICON.search} />
        <TextInput
          {...props}
          placeholder={placeholder}
          placeholderTextColor={Colors.GrayBlue || placeholderTextColor}
          style={[styles.input, { color: theme.text }]}
          value={value}
          returnKeyType={"search"}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
);

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    minHeight: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  input: {
    fontSize: 13,
    lineHeight: 16,
    marginLeft: 16,
  },
});
