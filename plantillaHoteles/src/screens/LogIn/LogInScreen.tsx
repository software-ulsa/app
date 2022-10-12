import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Container, Content } from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import GoogleFaceBookBtn from '../../components/SignUpLogIn/GoogleFaceBookBtn';
import styles from './Styles/LogInStyle';
import { Images } from '../../theme';
import { useState } from 'react';
import { SignIn, getToken } from '../../API/authAPI';
import AsyncStorage from '@react-native-community/async-storage';

export interface Props {
  navigation: any;
}
function LogInScreen({ navigation }: any) {
  const [form, setForm] = useState({ email: "", password: "" })
  const [token, setToken] :any = useState();


  const onSubmitHandle = async () => {
    console.log(0);
    SignIn(form);
    setToken(await getToken())
    if(token != undefined){
      navigation.navigate('Home')
    } 
  }

  return (
    <Container>
      <Content
        hasHeader
        contentContainerStyle={styles.container}
        extraScrollHeight={1}>
        <LogoHeading heading="Log in" />
        <View style={styles.signupLoginInputGroup}>
          <TextInput
            defaultInput
            placeholder="Email"
            type="email-address"
            onChangeText={(newText: string) => {
              setForm({ ...form, email: newText })
            }}
            navigation={navigation}
          />
          <TextInput
            passwordInput
            placeholder="Password"
            type="default"
            onChangeText={(newText: string) => {
              setForm({ ...form, password: newText })
            }}
            navigation={navigation}
          />
          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
          <CommanBtnScreen
            btnText="Log in"
            commanBtnStyle={styles.signUpLogInBtn}
            onBtnPress={() => onSubmitHandle()}
          />
          <CommanText commanText="Or log in using" />
          <View style={styles.googleFaceBookBtnRow}>
            <GoogleFaceBookBtn
              googleImg
              btnImage={Images.Google}
              btnText="Google"
            />
            <GoogleFaceBookBtn btnImage={Images.Facebook} btnText="Facebook" />
          </View>
          <Text style={styles.bottomAccountText}>
            Don’t have an account yet? {''}
            <Text
              style={styles.loginSignupBtnText}
              onPress={() => navigation.navigate('Signup')}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </Content>
    </Container>
  );
}

export default LogInScreen;

