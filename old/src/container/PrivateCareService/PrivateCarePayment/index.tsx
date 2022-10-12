import React, { memo } from "react";
import { View, StyleSheet, Modal } from "react-native";
import Theme from "style/Theme";
import scale from "utils/scale";
import Colors from "configs/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { width } from "configs/Const";
import ConfirmPayment from "components/ConfirmPayment";
import useModalAnimation from "hooks/useModalAnimation";
import DialogInputCode from "components/DialogInputCode";
import { Routes } from "configs";
import { payment } from "type/payment";
import { DOCTOR_PROFILE } from "configs/Data";
import Container from "elements/Layout/Container";

const PrivateCarePayment = memo(({ route }: any) => {
  const { navigate, setOptions } = useNavigation();
  const { visible, open, close, transY } = useModalAnimation();
  const [code, setCode] = React.useState<string>("");
  const [icon, setIcon] = React.useState<string>("typeLiveChat");
  const [payment, setPayment] = React.useState<payment>();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <Container style={{ ...Theme.headerBackGround }} />
      ),
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  }, [setOptions]);
  useFocusEffect(
    React.useCallback(() => {
      if (route && route.params) {
        if (route.params.type) {
          setIcon(route.params.type);
        }
        if (route.params.payment) {
          setPayment(route.params.payment);
        }
      }
    }, [route.params.type, route.params.payment])
  );
  const onPressPromoCode = React.useCallback(() => {
    open();
  }, []);
  const onPressChangeCode = React.useCallback(() => {
    navigate(Routes.PaymentChangeCard, { id: payment?.id || 0 });
  }, [payment]);
  const onPressPayRequest = React.useCallback(() => {
    navigate(Routes.PaymentSuccessful);
  }, []);
  return (
    <Container style={styles.container}>
      <ConfirmPayment
        stepCurrent={3}
        stepSum={3}
        privceSell={code ? 30 : 0}
        iconservice={icon}
        payment={payment}
        priceService={45}
        onPressPromoCode={onPressPromoCode}
        onPressChangeCode={onPressChangeCode}
        onPressPaymentAndSend={onPressPayRequest}
        doctorInfo={DOCTOR_PROFILE}
      />
      {
        <Modal
          visible={visible}
          onRequestClose={close}
          transparent
          animationType={"none"}
        >
          <DialogInputCode
            close={close}
            open={open}
            transY={transY}
            header={"Enter promo code"}
            onPress={(code) => setCode(code)}
          />
        </Modal>
      }
    </Container>
  );
});

export default PrivateCarePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  frameText: {
    ...Theme.flexRowSpace,
    marginTop: scale(16),
  },
  frameCardNumber: {
    ...Theme.flexRowSpace,
    marginTop: scale(26),
  },
  buttonLinear: {
    width: scale(327),
    height: scale(50),
  },

  iconService: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(12),
  },
  iconStyle: {
    width: scale(32),
    height: scale(32),
  },

  
});
