import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Text from "elements/Text";
import { Colors } from "configs";
import ButtonLinear from "elements/Buttons/ButtonLinear";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Theme from "style/Theme";
import TabBar from "elements/TabBar";
import { useTheme } from "configs/Theme";
import Layout from "elements/Layout/Layout";
import Container from "elements/Layout/Container";
import Line from "elements/Layout/Line";

interface Props {
  translateY: any;
  close: () => void;
  handleShowDoctor?: () => void;
}

export default React.memo(({ translateY, close, handleShowDoctor }: Props) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        onPress={close}
        activeOpacity={1}
      />
      <Animated.View
        style={[
          styles.modal,
          { backgroundColor: theme.backgroundItem },
          { transform: [{ translateY: Animated.multiply(1, translateY) }] },
        ]}
      >
        <View style={Theme.buttonSlider} />
        <Text
          marginTop={22}
          bold
          marginHorizontal={24}
          size={17}
          lineHeight={24}
        >
          Filter Insights
        </Text>
        <Line style={styles.line} />
        <Text
          marginTop={24}
          marginLeft={24}
          size={15}
          lineHeight={18}
          marginBottom={24}
        >
          Only show:
        </Text>
        <TabBar
          activeTintColor={theme.activeTincolor}
          inactiveTintColor={theme.backgroundItem}
          activeBackgroundColor={theme.activeBackgroundColor}
          style={styles.tabBar}
          tabs={["Entire network", "Refferal Network"]}
        />
        <Text
          marginTop={32}
          marginBottom={24}
          marginLeft={24}
          size={15}
          lineHeight={18}
        >
          Sort by:
        </Text>
        <TabBar
          inactiveTintColor={Colors.White}
          activeBackgroundColor={theme.activeBackgroundColor}
          style={styles.tabBar}
          tabs={["Reputatiion", "Distance"]}
        />
        <View style={styles.viewButton}>
          <ButtonLinear
            white
            onPress={handleShowDoctor}
            title={"Show +5 doctors"}
            style={styles.button}
          />
        </View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000054",
  },
  modal: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    height: "auto",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  line: {
    height: 1,
    marginTop: 24,
  },
  viewButton: {
    paddingHorizontal: 24,
    marginBottom: getBottomSpace() + 8,
    marginTop: 48,
  },
  button: {
    marginTop: 0,
  },
  icon: {
    marginRight: 8,
  },
  tabBar: {
    marginHorizontal: 24,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 8,
  },
});
