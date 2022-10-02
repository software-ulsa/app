import React, { memo, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import { useNavigation } from "@react-navigation/native";
import { Colors, Routes } from "configs";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import ConfirmPayment from "components/ConfirmPayment";
import { DOCTOR_PROFILE } from "configs/Data";
import { useTheme } from "configs/Theme";
import { getBottomSpace } from "react-native-iphone-x-helper";
import scale from "utils/scale";
import Container from "elements/Layout/Container";

interface BookAppointmentPaymentProps {}

const BookAppointmentPayment = memo(({}: BookAppointmentPaymentProps) => {
  const { theme } = useTheme();
  const { setOptions, navigate } = useNavigation();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        backgroundColor: theme.backgroundHeader,
        shadowColor: "transparent",
        elevation: 0,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  });

  const onPressPaymentAndSend = () => {
    navigate(Routes.BookAppointmentSuccessful);
  };

  return (
    <Container style={styles.container}>
      <ConfirmPayment
        stepCurrent={3}
        stepSum={3}
        iconservice="appointmentActive"
        priceService={45}
        doctorInfo={DOCTOR_PROFILE}
        onPressPaymentAndSend={onPressPaymentAndSend}
      />
    </Container>
  );
});

export default BookAppointmentPayment;

const styles = StyleSheet.create({
  container: {
    paddingBottom: getBottomSpace() ,
    flex: 1,
    paddingHorizontal: 16,
  },
});
