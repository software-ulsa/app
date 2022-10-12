import { themes, useTheme } from "configs/Theme";
import React from "react";
import {
  View as DefaultView,
  ViewProps,
  ViewStyle,
  PressableStateCallbackType,
  ColorValue,
} from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";
interface Props extends ViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: ViewStyle;
  borderColor?: ColorValue | string;
  borderRadius?: number;
}

const Layout = ({ children, style, borderColor, borderRadius }: Props) => {
  const { theme } = useTheme();

  return (
    <DefaultView
      style={[
        {
          backgroundColor: theme.backgroundItem,
          borderColor: borderColor || theme.borderColor,
          borderRadius: borderRadius,
        },
        style,
      ]}
    >
      {children}
    </DefaultView>
  );
};
export default Layout;
