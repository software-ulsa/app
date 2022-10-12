import React, { memo, Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Image } from "react-native";
import HeaderButton from "elements/HeaderButton";
import Theme from "style/Theme";
import Text from "elements/Text";
import scale from "utils/scale";
import { Colors } from "configs";
import InputApp from "elements/InputApp";
import TextInput from "elements/TextInput";
import ButtonLinear from "elements/Buttons/ButtonLinear";
import ButtonChangeCode from "components/ButtonChangeCode";
import { TcodeArea } from "type/codeArea";
import { categoryList } from "type/category";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Content from "elements/Layout/Content";
import { IMAGE } from "images/Image";

interface SignUpUiProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  secondName: string;
  setSecondName: Dispatch<SetStateAction<string>>;
  apePat: string;
  setApePat: Dispatch<SetStateAction<string>>;
  apeMat: string;
  setApeMat: Dispatch<SetStateAction<string>>;
  matricula: string;
  setMatricula: Dispatch<SetStateAction<string>>;
  edad: string;
  setEdad: Dispatch<SetStateAction<string>>;
  sexo: string;
  setSexo: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  isValidEmail: boolean;
  codeArea: categoryList;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  visiblePassword: boolean;
  onShowHidePassword: () => void;
  onSignUp: () => void;
  onTermOfUse: () => void;
  onPrivacyPolicy: () => void;
  onGoToLogin: () => void;
  openModalChange: () => void;
  onLogInFacebook: () => void;
  onLogInTwitter: () => void;
}

const SignUpUi = memo(
  ({
    name,
    setName,
    secondName,
    setSecondName,
    apePat,
    setApePat,
    apeMat,
    setApeMat,
    matricula,
    setMatricula,
    edad,
    setEdad,
    sexo,
    setSexo,
    email,
    setEmail,
    isValidEmail,
    codeArea,
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    visiblePassword,
    onShowHidePassword,
    onSignUp,
    onTermOfUse,
    onPrivacyPolicy,
    onGoToLogin,
    openModalChange,
    onLogInFacebook,
    onLogInTwitter,
  }: SignUpUiProps) => {
    return (
      <Content style={styles.container} showsVerticalScrollIndicator={false}>
        <Text size={24} lineHeight={28} bold center>
          Bienvenido a
        </Text>
        <Image
          source={IMAGE.logoStretch}
          style={styles.logo}
          resizeMode="center"
        />
        <Text
          size={13}
          lineHeight={22}
          marginTop={16}
          center
          color={Colors.DarkJungleGreen}
        >
          {"¿Ya tienes cuenta? "}
          <Text
            type="H6"
            color="blue"
            semiBold
            onPress={onGoToLogin}
            //white
          >
            Inicia sesi&oacute;n
          </Text>
        </Text>
        <InputApp
          value={name}
          onChangeText={setName}
          title={"Nombre"}
          marginTop={scale(15)}
          placeholder={"Nombre"}
          //isShowIcon={isValidEmail}
          icon={
            <Image
              source={require("images/Icon/ic_accept.png")}
              style={Theme.icons}
            />
          }
        />
        <InputApp
          value={secondName}
          onChangeText={setSecondName}
          title={"Segundo Nombre"}
          marginTop={scale(15)}
          placeholder={"Segundo Nombre"}
          //isShowIcon={isValidEmail}
          icon={
            <Image
              source={require("images/Icon/ic_accept.png")}
              style={Theme.icons}
            />
          }
        />
        <InputApp
          value={apePat}
          onChangeText={setApePat}
          title={"Primer Apellido"}
          marginTop={scale(15)}
          placeholder={"Primer Apellido"}
          //isShowIcon={isValidEmail}
          icon={
            <Image
              source={require("images/Icon/ic_accept.png")}
              style={Theme.icons}
            />
          }
        />
        <InputApp
          value={apeMat}
          onChangeText={setApeMat}
          title={"Segundo Apellido"}
          marginTop={scale(15)}
          placeholder={"Segundo Apellido"}
          //isShowIcon={isValidEmail}
          icon={
            <Image
              source={require("images/Icon/ic_accept.png")}
              style={Theme.icons}
            />
          }
        />
        <InputApp
          value={matricula}
          onChangeText={setMatricula}
          title={"Matricula"}
          marginTop={scale(15)}
          placeholder={"Matricula"}
          //isShowIcon={isValidEmail}
          icon={
            <Image
              source={require("images/Icon/ic_accept.png")}
              style={Theme.icons}
            />
          }
        />
        <Text size={13} lineHeight={16} marginTop={15}>
          Sexo
        </Text>
        <View style={styles.phoneView}>
          <ButtonChangeCode codeArea={codeArea} onPress={openModalChange} />
        </View>
        <Text size={13} lineHeight={16} marginTop={15}>
          Edad
        </Text>
        <View style={styles.phoneView}>
          <TextInput
            value={edad}
            onChangeText={setEdad}
            style={styles.phoneNumber}
            borderColor={Colors.Isabelline}
          />
        </View>
        <InputApp
          value={email}
          onChangeText={setEmail}
          title={"Correo"}
          marginTop={scale(15)}
          placeholder={"Correo"}
          isShowIcon={isValidEmail}
          icon={
            <Image
              source={require("images/Icon/ic_accept.png")}
              style={Theme.icons}
            />
          }
        />
        <InputApp
          title={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!visiblePassword}
          marginTop={15}
          icon={
            <Image
              source={require("images/Icon/ic_eye_on.png")}
              style={Theme.icons}
            />
          }
          isShowIcon
          iconPress={onShowHidePassword}
        />
        <ButtonLinear
          title={"Registrame"}
          onPress={onSignUp}
          style={{ marginTop: scale(24) }}
          white
        />

        <Text
          type="P6"
          color={Colors.DarkJungleGreen}
          center
          marginTop={scale(30)}
          marginBottom={scale(15)}
        >
          Al registrarte, aceptas nuestros{"\n"}
          <Text
            type="P6"
            color={Colors.BlueCrayola}
            onPress={onTermOfUse}
            center
          >
            T&eacute;rminos de uso
          </Text>{" "}
          y{" "}
          <Text
            type="P6"
            color={Colors.BlueCrayola}
            onPress={onPrivacyPolicy}
            center
          >
            Pol&iacute;ticas de Privacidad.
          </Text>
        </Text>
      </Content>
    );
  }
);

export default SignUpUi;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  password: {
    marginTop: 24,
  },
  phoneNumber: {
    flex: 1,
  },
  emailInput: {
    marginTop: scale(34),
  },
  bottom: {
    ...Theme.flexOne,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flag: {
    width: 32,
    height: 20,
  },
  changePhoneCode: {
    position: "absolute",
    right: 16,
    alignSelf: "center",
  },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
  textUnderline: {
    textDecorationLine: "underline",
  },
  loginSocial: {
    marginTop: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  frameLoginSocial: {
    marginTop: scale(20),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
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
  logo: {
    marginHorizontal: "auto",
    alignSelf:'center',
    width: scale(200),
    height: scale(120),
  },
});

{
  /* INICIAR SESSION CON REDES SOCIALES
  <View style={styles.loginSocial}>
          <Text type="H6" color={Colors.GrayBlue} style={styles.textUnderline}>
            Log in with social account
          </Text>
        </View>
        <View style={styles.frameLoginSocial}>
          <TouchableOpacity
            style={styles.buttonFacebook}
            onPress={onLogInFacebook}
          >
            <Image
              style={{ width: scale(20), height: scale(20) }}
              source={require("images/Icon/ic_facebook.png")}
            />
            <Text type="H5" white bold marginLeft={scale(10)}>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTwitter}
            onPress={onLogInTwitter}
          >
            <Image
              style={{ width: scale(20), height: scale(20) }}
              source={require("images/Icon/ic_twitter.png")}
            />
            <Text type="H5" white bold marginLeft={scale(10)}>
              Twitter
            </Text>
          </TouchableOpacity>
        </View>
  */
}
