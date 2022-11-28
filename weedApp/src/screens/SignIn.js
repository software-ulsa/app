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
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState("");

  const { signIn } = React.useContext(AuthContext);

  const iniciarSesion = async () => {
    try {
      const data = await UsuarioService.login(email.value, password);
      signIn(data.token, data.userFound);
      showMessage({
        message: `Bienvenid@ ${data.userFound.persona.nombre}`,
        type: "success",
      });
      navigation.navigate("MainLayout");
    } catch (error) {
      console.log(error);
      if (error.error === "Usuario no existe.") {
        showMessage({
          message: error.error,
          type: "danger",
        });
      } else {
        showMessage({
          message: `Verifica tus credenciales`,
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
            }}
          >
            ¡Bienvenido de vuelta!
          </Text>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_400Regular,
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 16 * 1.7,
              marginBottom: 15,
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
            placeholder="Ej. NoobMaster69"
            returnKeyType="next"
            autoCapitalize="none"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            containerStyle={{ marginBottom: 10 }}
            icon={<ProfileTab color={COLORS.gray} />}
            keyboardType="default"
            fontStyle="italic"
          />
          {email.error ? (
            <>
              <Text
                style={{
                  ...FONTS.Mulish_400Regular,
                  color: "red",
                  fontSize: 10,
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
            fontStyle="italic"
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
          <Button
            title="ENTRAR"
            containerStyle={{
              width: "75%",
              display: "flex",
              alignSelf: "center",
            }}
            onPress={iniciarSesion}
          />
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
            ¿No tienes cuenta?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                ...FONTS.Mulish_400Regular,
                fontSize: 16,
                color: COLORS.goldenTransparent_05,
              }}
            >
              Regístrate.
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
