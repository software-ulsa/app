import { useTheme } from "configs/Theme";
import React from "react";
import {
  View as DefaultView,
  ViewProps,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
interface Props extends ViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: ViewStyle;
}

const Line = (props: Props) => {
  const { theme } = useTheme();
  return (
    <DefaultView
      style={[
        {
          height: 1,
          backgroundColor: theme.inactiveBackgroundColor,
        },
        props.style,
      ]}
    >
      {props.children}
    </DefaultView>
  );
};
export default Line;
