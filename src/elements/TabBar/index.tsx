import Text from "elements/Text";
import { Colors } from "configs";
import React, { memo, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  ColorValue,
} from "react-native";
import Theme from "style/Theme";
import { useTheme } from "configs/Theme";
import Container from "elements/Layout/Container";

interface Props {
  tabs?: string[];
  style?: ViewProps;
  activeTintColor?: string | ColorValue;
  inactiveTintColor?: string | ColorValue;
  activeBackgroundColor?: string | ColorValue;
  inactiveBackgroundColor?: string | ColorValue;
  tabStyle?: ViewProps;
  white?: boolean;
  onChangeTab?: (index: number) => void;
}

export default memo(
  ({
    tabs,
    onChangeTab,
    style,
    tabStyle,
    activeTintColor,
    inactiveTintColor,
    activeBackgroundColor,
    inactiveBackgroundColor,
    white,
  }: Props) => {
    const [tabActive, setTabActive] = React.useState<number>(0);

    const _onChangeTab = useCallback(
      (number: number) => {
        setTabActive(number);
        onChangeTab && onChangeTab(number);
      },
      [onChangeTab]
    );
    const { theme } = useTheme();
    return (
      <Container
        style={[styles.container, style, { borderColor: theme.activeTincolor }]}
      >
        {tabs.map((item, index) => {
          let backgroundColor = {
            backgroundColor:
              tabActive === index
                ? activeBackgroundColor
                : theme.inactiveBackgroundColor,
          };

          const tintColor = tabActive === index ? "#ffffff" : "#9393AA";
          return (
            <TouchableOpacity
              onPress={() => _onChangeTab(index)}
              key={index}
              style={{ ...styles.tabStyle, ...tabStyle, ...backgroundColor }}
            >
              <Text white color={tintColor} size={13} lineHeight={16} semiBold>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Container>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Theme.flexDirection,
    justifyContent: "space-around",
    borderRadius: 10,
  },
  tabStyle: {
    height: 40,
    flex: 1,
    marginRight: 1,
    borderRadius: 8,
    ...Theme.center,
  },
});
