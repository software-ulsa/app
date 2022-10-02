import React, { memo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ViewStyle,
} from "react-native";
import Text from "elements/Text";
import { Colors } from "configs";
import scale from "utils/scale";
import { dataPerson } from "type/healthyQuestion";
import { ICON } from "images/Icon";
import keyExtractor from "utils/keyExtractor";
import Layout from "elements/Layout/Layout";
import { useTheme } from "configs/Theme";

interface TouchablePersonProps {
  data: Array<dataPerson>;
  isYou: boolean;
  onPress: (item: dataPerson) => void;
  style: ViewStyle;
}

const TouchablePerson = memo((props: TouchablePersonProps) => {
  const { theme } = useTheme();
  return (
    <Layout style={props.style}>
      <Layout style={styles.frameImg}>
        <Image
          source={ICON.accountNormal}
          resizeMode="center"
          style={styles.img}
        />
        <Text size={scale(15)} lineHeight={scale(18)} bold center>
          Is this for You or Someone else?
        </Text>
      </Layout>
      <Layout style={styles.frameFlat}>
        {props.data.map((item: dataPerson, index: number) => {
          if (item.check) {
            return (
              <Layout style={[styles.frameTouch]} key={index}>
                <TouchableOpacity
                  style={styles.touch1}
                  onPress={() => props.onPress(item)}
                >
                  <Image
                    source={
                      item.isAdd
                        ? ICON.addPatient
                        : item.check
                        ? ICON.accountWhite
                        : ICON.account
                    }
                    resizeMode="center"
                  />
                </TouchableOpacity>
                <Text
                  size={scale(13)}
                  lineHeight={scale(22)}
                  bold
                  center
                  marginTop={scale(16)}
                >
                  {item.isAdd ? "Someone else" : item.lastName}
                </Text>
              </Layout>
            );
          }
          return (
            <Layout style={[styles.frameTouch]} key={index}>
              <TouchableOpacity
                style={[styles.touch2, { borderColor: theme.borderColor }]}
                onPress={() => props.onPress(item)}
              >
                <Image
                  source={item.isAdd ? ICON.addPatient : ICON.account}
                  resizeMode="center"
                />
              </TouchableOpacity>
              <Text
                size={scale(13)}
                lineHeight={scale(22)}
                bold
                center
                marginTop={scale(16)}
              >
                {item.isAdd ? "Someone else" : item.lastName}
              </Text>
            </Layout>
          );
        })}
      </Layout>
    </Layout>
  );
});

export default TouchablePerson;

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(16),
  },
  frameImg: {
    flexDirection: "row",
    padding: scale(16),
    alignItems: "center",
    borderBottomWidth: scale(1),
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  img: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(16),
    marginLeft: scale(8),
  },
  frameFlat: {
    flexDirection: "row",
    padding: scale(24),
    paddingRight: 12,
    alignItems: "center",
    flexWrap: "wrap",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  frameTouch: {
    marginLeft: scale(8),
    marginRight: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  touch1: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DodgerBlue,
  },
  touch2: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: scale(1),
    borderColor: Colors.WhiteSmoke,
  },
});
