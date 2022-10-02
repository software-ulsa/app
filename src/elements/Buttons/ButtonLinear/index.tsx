import React from "react";
import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Theme from "style/Theme";
import { Colors } from "configs";
import ButtonBorder from "../ButtonBorder";
import LinearColors from "elements/LinearColors";
import Text from "elements/Text";
import { useTheme } from "configs/Theme";

interface ButtonLinearProps {
  title: string;
  borderColor?: ColorValue | string;
  style?: ViewStyle;
  onPress?: () => void;
  children?: any;
  leftChildren?: any;
  styleButton?: ViewStyle;
  disabled?: boolean;
  colors?: string[];
  width?: number;
  height?: number;
  white?: boolean;
}

const ButtonLinear = ({
  title,
  style,
  onPress,
  children,
  styleButton,
  leftChildren,
  disabled,
  colors,
  width,
  height,
  white,
}: ButtonLinearProps) => {
  const { theme } = useTheme();
  if (disabled) {
    return (
      <ButtonBorder
        title={title}
        style={styleButton}
        backgroundColor={Colors.Isabelline}
      />
    );
  }
  return (
    <TouchableOpacity
      style={[styleButton]}
      activeOpacity={0.54}
      onPress={onPress}
    >
      <LinearColors
        style={{
          ...styles.container,
          ...style,
          borderColor: theme.borderColor,
        }}
        vertical
        locations={[0, 0.75]}
        colors={colors || [Colors.TurquoiseBlue, Colors.TealBlue]}
      >
        {leftChildren}
        <Text marginLeft={8} white={white} type="H5" bold>
          {title}
        </Text>
        {children}
      </LinearColors>
    </TouchableOpacity>
  );
};

export default ButtonLinear;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 12,
    ...Theme.flexRowCenter,
  },
});
