import React, { memo, useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "elements/Text";
import ButtonLinear from "elements/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import { Colors, Routes } from "configs";
import VisitTimeCalendar from "components/Consults/VisitTimeCalendar";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import EditVisitTimeItem from "components/ModalEditVisitTime/EditVisitTimeItem";
import { VISIT_TIME_LIST } from "configs/Data";
import { useTheme } from "configs/Theme";
import Container from "elements/Layout/Container";
import Layout from "elements/Layout/Layout";
import Content from "elements/Layout/Content";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import scale from "utils/scale";

export default memo(() => {
  const { navigate, setOptions } = useNavigation();

  const [selectedDate, setSelectedDate] = useState<any>("Friday, Jan 5, 2020");
  const [selectedTime, setSelectedTime] = useState(VISIT_TIME_LIST[0]);

  const onContinue = () => {
    navigate(Routes.BookAppointmentDetail);
  };
  const { theme } = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        elevation: 0,
        backgroundColor: theme.backgroundHeader,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  });
  return (
    <Container style={styles.container}>
      <View>
        <Text
          bold
          size={13}
          lineHeight={16}
          marginLeft={24}
          marginVertical={16}
        >
          Step 1 of 3
        </Text>
        <Text bold size={24} lineHeight={28} marginLeft={24} marginBottom={24}>
          Select Visit Time
        </Text>
        <VisitTimeCalendar style={{ height: scale(300, true) }} />
      </View>
      <Container style={styles.listTime}>
        <Text bold size={15} lineHeight={18}>
          {selectedDate}
        </Text>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {VISIT_TIME_LIST.map((item, index) => {
            return (
              <EditVisitTimeItem
                {...item}
                selectedId={selectedTime.id}
                key={index}
                onPress={() => {
                  setSelectedTime(item);
                }}
              />
            );
          })}
        </ScrollView>
      </Container>
      <Layout style={styles.button}>
        <ButtonLinear white title="Continue" onPress={onContinue} />
      </Layout>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listTime: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  scrollView: {
    height: 180,
    marginVertical: 24,
  },
  button: {
    paddingHorizontal: 24,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    height: scale(96, true),
  },
});
