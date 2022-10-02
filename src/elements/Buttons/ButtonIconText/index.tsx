import React, { memo } from "react";
import {
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Image,
  ColorValue,
} from "react-native";
import Text, { TextProps } from "elements/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import { ICON } from "images/Icon";
import { useTheme } from "configs/Theme";

interface ButtonTextProps {
  title?: string;
  icon?: any;
  tintColor?: string;
  style?: ViewStyle;
  iconStyle?: any;
  titleColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
  borderColor?: string | ColorValue;
}

const ButtonIconText = memo(
  ({
    title,
    icon,
    style,
    tintColor,
    iconStyle,
    titleColor = Colors.TealBlue,
    onPress,
    borderColor,
    ...textProps
  }: ButtonTextProps) => {
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          { borderColor: theme.borderColor || borderColor },
        ]}
        onPress={onPress}
        activeOpacity={0.54}
      >
        <Image
          style={iconStyle}
          source={ICON[`${icon}`]}
          tintColor={tintColor}
        />
        <Text type="H5" color={titleColor} {...textProps}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default ButtonIconText;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    ...Theme.center,
  },
});
