import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Text from "elements/Text";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import scale from "utils/scale";
import { Colors, Routes } from "configs";
import InputApp from "elements/InputApp";
import Theme from "style/Theme";
import ButtonLinear from "elements/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import validationEmail from "utils/validation/email";
import { IMAGE } from "images/Image";
import Container from "elements/Layout/Container";

interface LoginProps {}

const Login = memo((props: LoginProps) => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("jairo@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const onShowHidePassword = useCallback(() => {
    setVisiblePassword((prev) => !prev);
  }, []);

  const onSignUp = useCallback(() => {
    navigate(Routes.SignUp);
  }, [navigate]);
  const onLogin = useCallback(() => {
    navigate(Routes.MainTab);
  }, []);
  const onForgotPassword = useCallback(() => {
    navigate(Routes.ForgetPassword);
  }, [navigate]);

  useEffect(() => {
    const validation = validationEmail(email);
    setIsValidEmail(validation);
  }, [email]);

  const onLogInFacebook = useCallback(async () => {
    ///
  }, []);
  const onLogInTwitter = useCallback(async () => {
    ///
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoApp}>
          <Image source={IMAGE.logo} style={styles.logo} resizeMode="center" />
          <Text type="H5" bold style={{marginBottom: "15px"}}>
          Iniciar sesión
          </Text>
        </View>
        <View style={styles.inputLogin}>
          <InputApp
            title={"Correo electrónico"}
            value={email}
            onChangeText={setEmail}
            icon={
              <Image
                source={require("images/Icon/ic_accept.png")}
                style={styles.icon}
              />
            }
            isShowIcon={isValidEmail}
          />
          <InputApp
            title={"Contraseña"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!visiblePassword}
            marginTop={24}
            icon={
              <Image
                source={require("images/Icon/ic_eye_on.png")}
                style={styles.icon}
              />
            }
            isShowIcon
            iconPress={onShowHidePassword}
          />
        </View>
        <ButtonLinear
          white
          title={"Entrar"}
          onPress={onLogin}
          style={{ marginTop: scale(24) }}
        />
        <TouchableOpacity style={styles.forgot} onPress={onForgotPassword}>
          <Text type="H6" color={Colors.GrayBlue} style={styles.textUnderline}>
            Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
        <View style={styles.loginSocial}>
          {/* <Text type="H6" color={Colors.GrayBlue}>
            Inicia sesión con:
          </Text> */}
        </View>
        <View style={styles.signUp}>
          <Text type="H6" color={Colors.GrayBlue}>
            No tienes cuenta?{" "}
            <Text
              type="H6"
              color={Colors.BlueCrayola}
              semiBold
              onPress={onSignUp}
              blueLight
            >
              Registrate
            </Text>
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
});

export default Login;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  logoApp: {
    marginTop: getStatusBarHeight() + scale(46),
    alignSelf: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: scale(12),
    marginLeft: scale(12),
    width: scale(150),
    height: scale(150),
  },
  inputLogin: {
    marginTop: scale(60),
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
  margin24: {
    marginTop: scale(24),
  },
  forgot: {
    alignSelf: "center",
    marginTop: scale(32),
  },
  signUp: {
    alignSelf: "center",
    flex: 1,
    marginBottom: scale(16),
    justifyContent: "flex-end",
  },
  textUnderline: {
    textDecorationLine: "underline",
  },
  loginSocial: {
    marginTop: scale(80),
    alignItems: "center",
    justifyContent: "center",
  },
  frameLoginSocial: {
    marginTop: scale(20),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: scale(40),
  },
  buttonFacebook: {
    flexDirection: "row",
    marginTop: scale(15),
    width: scale(152),
    height: scale(50),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bDazzledBlue,
  },
  buttonTwitter: {
    flexDirection: "row",
    marginTop: scale(15),
    width: scale(152),
    height: scale(50),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.MediumTurquoise,
  },
});
