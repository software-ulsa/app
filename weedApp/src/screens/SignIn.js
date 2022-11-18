import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Check, EyeOff, RememberSvg, ProfileTab } from "../svg";
import UsuarioService from "../service/UsuarioService";
import { AuthContext } from "../navigation/AppNavigation";
import { showMessage } from "react-native-flash-message";

const SignIn = () => {
  const navigation = useNavigation();
  const [remember, setRemember] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  //const [email, setEmail] = useState("");
  const [email, setEmail] = useState({ value: "admin", error: "" });
  const [password, setPassword] = useState("123");

  const { signIn } = React.useContext(AuthContext);

  function emailValidator(email) {
    const re = /\S+@\S+\.\S+/;
    if (!email) return "El correo no puede estar vacio.";
    if (!re.test(email)) return "Por favor ingresa un correo valido.";
    return "";
  }

  const iniciarSesion = async () => {
    try {
      //console.log("1");
      // const emailError = emailValidator(email.value);
      // //console.log(emailError);
      // if (emailError) {
      //   //console.log("1");
      //   setEmail({ ...email, error: emailError });
      //   return;
      // }
      //console.log(email.value, password);
      const data = await UsuarioService.login(email.value, password);
      //console.log(data);
      signIn(data.token, data.userFound);
      showMessage({
        message: `Bienvenid@ ${data.userFound.persona.nombre}`,
        type: "success",
      });
      navigation.navigate("MainLayout");
    } catch (error) {
      console.log(error);
      if(error.error === 'Usuario no existe.'){
        showMessage({
          message: error.error,
          type: "danger",
        });
      }else{
        showMessage({
          message: `Usuario / Contraseña incorrecta`,
          type: "danger",
        });
      }
      
    }
  };

  function renderContent() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ContainerComponent>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.H1,
              color: COLORS.black,
              marginBottom: 14,
              lineHeight: 32 * 1.2,
              textTransform: "capitalize",
            }}
          >
            ¡Bienvenido!
          </Text>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_400Regular,
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 16 * 1.7,
              marginBottom: 30,
            }}
          >
            Ingresa para continuar
          </Text>
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
            }}
          >
            Usuario
          </Text>
          <InputField
            placeholder="user"
            returnKeyType="next"
            //value={email}
            //onChangeText={setEmail}
            autoCapitalize="none"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            containerStyle={{ marginBottom: 10 }}
            icon={<ProfileTab color={COLORS.gray} />}
            //autoCompleteType="email"
            //textContentType="text"
            keyboardType="default"
            //style={{ botton: 15 }}
          />
          {email.error ? (
            <>
              <Text
                style={{
                  ...FONTS.Mulish_400Regular,
                  color: "red",
                  fontSize: 10,
                  //lineHeight: 16 * 1.7,
                  marginBottom: 5,
                }}
              >
                {email.error}
              </Text>
            </>
          ) : (
            <></>
          )}
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
            }}
          >
            Contrase&ntilde;a
          </Text>
          <InputField
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!visiblePassword}
            placeholder="*******"
            containerStyle={{ marginBottom: 20 }}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setVisiblePassword(!visiblePassword);
                }}
              >
                <EyeOff />
              </TouchableOpacity>
            }
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            {/* <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setRemember(!remember)}
            >
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: COLORS.goldenTransparent_05,
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {remember && <RememberSvg />}
              </View>

              <Text
                style={{
                  ...FONTS.Mulish_400Regular,
                  fontSize: 16,
                  color: COLORS.gray,
                  lineHeight: 16 * 1.7,
                }}
              >
                Recordar
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text
                style={{
                  ...FONTS.Mulish_400Regular,
                  fontSize: 16,
                  color: COLORS.goldenTransparent_05,
                  lineHeight: 16 * 1.7,
                }}
              >
                ¿Olvidé mi contrase&ntilde;a?
              </Text> 
            </TouchableOpacity> */}
          </View>
          <Button title="Iniciar sesi&oacute;n" onPress={iniciarSesion} />
        </ContainerComponent>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            flex: 1,
            marginBottom: 13,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              fontSize: 16,
              color: COLORS.gray,
            }}
          >
            ¿No tengo cuenta?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                ...FONTS.Mulish_400Regular,
                fontSize: 16,
                color: COLORS.goldenTransparent_05,
              }}
            >
              Registrarme.
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Iniciar sesión" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
};

export default SignIn;
