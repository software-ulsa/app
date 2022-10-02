import React, { memo } from "react";
import {
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ColorValue,
} from "react-native";
import Text, { TextProps } from "elements/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import { useTheme } from "configs/Theme";

interface ButtonTextProps {
  title?: string;
  style?: ViewStyle;
  titleColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
  borderColor?: ColorValue | string;
  backgroundColor?: ColorValue | string;
  marginLeft?: number;
  highlight?: boolean;
  bluelight?: boolean;
  white?: boolean;
}

const ButtonText = memo(
  ({
    title,
    style,
    titleColor = Colors.DodgerBlue,
    onPress,
    backgroundColor,
    borderColor,
    marginLeft,
    highlight,
    bluelight,
    white,
    ...textProps
  }: ButtonTextProps) => {
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          {
            marginLeft: marginLeft,
            backgroundColor: backgroundColor || theme.backgroundItem,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.54}
      >
        <Text
          type="H5"
          color={titleColor}
          {...textProps}
          hilight={highlight}
          white={white}
          blueLight={bluelight}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default ButtonText;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.White,
    ...Theme.center,
  },
});
