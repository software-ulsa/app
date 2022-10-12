import * as React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Container, Content } from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import OtpInputs from 'react-native-otp-inputs';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import styles from './Styles/OtpStyle';

export interface Props {
  navigation: any;
}
function OtpForgotPasswordScreen({ navigation }: any) {
  let optConfirm = '123456';
  const [otpInputFill, setOtpInputFill] = useState(true);
  return (
    <Container>
      <Content hasHeader contentContainerStyle={styles.container}>
        <View style={styles.signupLoginInputGroup}>
          <LogoHeading
            heading="Confirm Your Number"
            logoHeadingStyle={styles.logoHeadingStyle}
          />
          <CommanText
            commanText="Enter the code we sent over SMS to +91 99985 85355:"
            commanTextstyle={styles.confirmNumberText}
          />
          {otpInputFill ? (
            <OtpInputs
              handleChange={(code) => {
                if (optConfirm === code) {
                  setOtpInputFill(false);
                  setTimeout(() => {
                    navigation.navigate('ResetPassword');
                  }, 3000);
                } else {
                  setTimeout(() => {
                    navigation.navigate('OtpForgotPassword');
                  }, 3000);
                }
              }}
              numberOfInputs={6}
              style={styles.otpInputContainer}
              inputStyles={styles.otpInputStyle}
              autofillFromClipboard={false}
            />
          ) : (
            <View style={styles.loaderContent}>
              <AnimatedEllipsis
                numberOfDots={5}
                minOpacity={0.4}
                animationDelay={200}
                style={styles.loaderDotsStyle}
              />
            </View>
          )}
          <Text style={styles.bottomAccountText}>
            Didn’t get a code? {''}
            <Text style={styles.loginSignupBtnText}>Resend</Text>
          </Text>
        </View>
        <View style={styles.bottomContinueBtn}>
          <CommanBtnScreen
            btnText="Continue"
            commanBtnStyle={styles.otpContinueBtn}
            onBtnPress={() => navigation.navigate('Login')}
          />
        </View>
      </Content>
    </Container>
  );
}

export default OtpForgotPasswordScreen;
