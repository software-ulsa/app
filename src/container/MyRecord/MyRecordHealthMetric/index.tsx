import React, { memo, useCallback, useLayoutEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Text from "elements/Text";
import { ICON } from "images/Icon";
import { Colors } from "configs";
import Theme from "style/Theme";
import { useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import { width } from "configs/Const";
import InputItem from "components/InputItem";
import keyExtractor from "utils/keyExtractor";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import Content from "elements/Layout/Content";
import Layout from "elements/Layout/Layout";
import { useTheme } from "configs/Theme";
import Line from "elements/Layout/Line";
import scale from "utils/scale";

const BASIC_INFOMATION_DATA = [
  {
    id: 0,
    label: "Current Height(ft in)",
    value: "",
  },
  {
    id: 1,
    label: "Current Weight (lbs)",
    value: "150",
  },
  {
    id: 2,
    label: "Body Mass Index (BMI)",
    value: "23",
  },
];

const ADVANCE_INFOMATION_DATA = [
  {
    id: 0,
    label: "Blood Pressure (Systolic)",
    placeholder: "N/A",
    value: "",
  },
  {
    id: 1,
    label: "Total Cholesterol",
    placeholder: "N/A",
    value: "",
  },
  {
    id: 2,
    label: "LDL Cholesterol",
    placeholder: "N/A",
    value: "",
  },
  {
    id: 3,
    label: "HDL Cholesterol",
    placeholder: "N/A",
    value: "",
  },
  {
    id: 4,
    label: "Triglycerides",
    placeholder: "N/A",
    value: "",
  },
  {
    id: 5,
    label: "Cholesterol/HDL Ratio",
    placeholder: "N/A",
    value: "",
  },
  {
    id: 6,
    label: "Glucose",
    placeholder: "N/A",
    value: "",
  },
];

export default memo(() => {
  const { setOptions } = useNavigation();
  const { theme } = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        shadowRadius: 0,
        shadowOffset: { height: 0 },
        elevation: 0,
        height: getStatusBarHeight() + scale(78),
        backgroundColor: theme.background,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} marginBottom={16} />,
    });
  }, [setOptions]);

  return (
    <Content
      style={styles.container}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <Text marginTop={24} bold size={24}>
        Health Metrics
      </Text>
      <Text size={11} marginTop={8} marginBottom={40}>
        Last updated: 01:29 PM Jan 04, 2020
      </Text>
      <Layout style={styles.contentView}>
        <View style={styles.contentHeader}>
          <Image source={ICON.account} />
          <Text marginLeft={16} bold size={15}>
            Basic Information
          </Text>
        </View>
        <Line />
        {BASIC_INFOMATION_DATA.map((item, index) => {
          return (
            <InputItem
              isShowIconLeft
              key={index}
              style={styles.content}
              {...item}
            />
          );
        })}
      </Layout>
      <Layout style={styles.contentView1}>
        <View style={styles.contentHeader}>
          <Image source={ICON.account} />
          <Text marginLeft={16} bold size={15}>
            Advance Informations
          </Text>
        </View>
        <Line />
        {ADVANCE_INFOMATION_DATA.map((item, index) => {
          return <InputItem key={index} style={styles.content} {...item} />;
        })}
      </Layout>
    </Content>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  contentView: {
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginBottom: 24,
  },
  contentView1: {
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginBottom: getBottomSpace() + scale(102),
  },
  contentHeader: {
    ...Theme.flexRow,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  content: {
    paddingHorizontal: 24,
  },
  avatar: {
    width: 112,
    height: 112,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 56,
  },
  touchRow: {
    ...Theme.flexRow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.WhiteSmoke,
    padding: 12,
    height: 48,
  },
  phoneTextInput: {
    width: width - 216,
    marginLeft: 8,
  },
  touchLanguage: {
    ...Theme.flexRow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.WhiteSmoke,
    padding: 12,
    paddingRight: 40,
    flexWrap: "wrap",
  },
  language: {
    ...Theme.flexRowCenter,
    backgroundColor: Colors.DodgerBlue,
    margin: 4,
    borderRadius: 4,
    padding: 8,
  },
  iconClose: {
    width: 9,
    height: 9,
  },
  iconCloseStyle: {
    width: 14,
    height: 14,
    ...Theme.center,
    backgroundColor: Colors.GrayBorder4,
    borderRadius: 30,
  },
});
