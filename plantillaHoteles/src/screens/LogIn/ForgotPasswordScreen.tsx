import * as React from 'react';
import { View, Text } from 'react-native';
import { Container, Content } from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import styles from './Styles/LogInStyle';

export interface Props {
  navigation: any;
}
function ForgotPasswordScreen({ navigation }: any) {
  return (
    <Container>
      <Content hasHeader contentContainerStyle={styles.container}>
        <LogoHeading heading="Forgot Password" />
        <View style={styles.signupLoginInputGroup}>
          <CommanText
            commanText="Enter your registered phone number below"
            commanTextstyle={styles.forgotPasswordPageText}
          />
          <TextInput
            defaultInput
            placeholder="Phone number"
            type="number-pad"
            inputStyle={styles.forgotPasswordInput}
            navigation={navigation}
          />
          <CommanBtnScreen
            btnText="Submit"
            commanBtnStyle={styles.signUpLogInBtn}
            onBtnPress={() => navigation.navigate('OtpForgotPassword')}
          />
        </View>
        <Text style={styles.bottomAccountText}>
          Remember the password? {''}
          <Text
            style={styles.loginSignupBtnText}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </Text>
      </Content>
    </Container>
  );
}

export default ForgotPasswordScreen;
