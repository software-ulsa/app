import { Colors, Constants } from "configs";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Animated, { sub } from "react-native-reanimated";
import Text from "elements/Text";
import { Alphabet } from "configs/Data";
import Theme from "style/Theme";
import { useTheme } from "configs/Theme";
import scale from "utils/scale";
import { ICON } from "images/Icon";
import { getBottomSpace } from "react-native-iphone-x-helper";

interface ModalAtoZProps {
  children?: any;
  onClose: () => void;
  transY: Animated.Node<number>;
  onPressItem?: (char: string) => void;
}

const ModalAtoZ = (props: ModalAtoZProps) => {
  const { theme } = useTheme();
  const [selectedAlphabet, setSelectedAlphabet] = useState<any>({});
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.onClose}
        activeOpacity={1}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.View
        style={[
          styles.modal,
          { backgroundColor: theme.background },
          {
            transform: [
              {
                translateY: sub(0, props.transY),
              },
            ],
          },
        ]}
      >
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text bold size={15} lineHeight={48} center color={Colors.GrayBlue}>
            #
          </Text>

          {Alphabet.map((item, index) => {
            const { char, id } = item;
            return (
              <TouchableOpacity
                style={
                  id == selectedAlphabet.id
                    ? styles.alphabetSelected
                    : styles.alphabet
                }
                key={index}
                activeOpacity={0.54}
                onPress={() => {
                  setSelectedAlphabet(item);
                  props.onPressItem && props.onPressItem(item.char);
                }}
              >
                <Text bold size={15} lineHeight={48} center>
                  {char}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.atoz}
          activeOpacity={0.54}
          onPress={() => {}}
        >
          <Image source={ICON.close} tintColor={Colors.White} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ModalAtoZ;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ModalBackground,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    paddingBottom: 24,
  },
  scrollView: {},
  modal: {
    width: 80,
    bottom: -Constants.height,
    borderRadius: 16,
    height: "50%",
    marginBottom: scale(122),
    ...Theme.center,
  },
  alphabet: {
    width: 40,
    height: 40,
    ...Theme.center,
  },
  alphabetSelected: {
    width: 40,
    height: 40,
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 12,
    ...Theme.center,
  },
  atoz: {
    position: "absolute",
    bottom: -getBottomSpace() - 36,
    alignSelf: "center",
    ...Theme.center,
    borderRadius: 12,
    backgroundColor: Colors.PinkOrange,
    width: scale(56),
    height: scale(56),
  },
});
