import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../navigation/AppNavigation";
import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import * as SecureStore from "expo-secure-store";
import CodigoService from "../service/CodigoService";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";

export default function ConfirmationCode() {
  const navigation = useNavigation();

  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [user, setUser] = useState({});

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  function renderContent() {
    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
      try {
        const userLS = await SecureStore.getItemAsync("user");
        setUser(JSON.parse(userLS));
      } catch (error) {
        console.log(error);
      }
    };

    const verificarCodigo = async () => {
      try {
        if (otp[1] == "" || otp[2] == "" || otp[3] == "" || otp[4] == "") {
          return showMessage({
            message: "Ingresa un código válido",
            type: "danger",
          });
        }
        const codigo = `${otp[1]}${otp[2]}${otp[3]}${otp[4]}`;
        const verificador = await CodigoService.validateCode(user.id, codigo);

        if (verificador.mensaje.includes("incorrecto")) {
          showMessage({
            message: "Código incorrecto",
            type: "danger",
          });
        } else {
          showMessage({
            message: "Correo verificado",
            type: "success",
          });
          navigation.navigate("AccountCreated");
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 0,
            alignItems: "center",
            paddingVertical: 25,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <ContainerComponent>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.H2,
                color: COLORS.black,
                lineHeight: 22 * 1.2,
                marginBottom: 25,
                marginTop: -15,
                textTransform: "capitalize",
              }}
            >
              Verifica tu correo
            </Text>

            <Text
              style={{
                ...FONTS.H6,
                color: COLORS.lightGray,
                marginBottom: -5,
                marginTop: -20,
                textAlign: "center",
              }}
            >
              Paso 2 de 3
            </Text>
            <Text
              style={{
                ...FONTS.Mulish_400Regular,
                fontSize: 16,
                color: COLORS.gray,
                marginBottom: 30,
                lineHeight: 16 * 1.7,
              }}
            >
              Ingresa el código de verificación.
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  borderRadius: 60,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: COLORS.goldenTransparent_05,
                }}
              >
                <TextInput
                  style={{
                    textAlign: "center",
                    paddingHorizontal: 22,
                    paddingVertical: 14.5,
                    textAlign: "center",
                    fontSize: 24,
                    fontFamily: "Mulish_400Regular",
                    color: COLORS.golden,
                    width: 60,
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={firstInput}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 1: text });
                    text && secondInput.current.focus();
                  }}
                />
              </View>
              <View
                style={{
                  borderRadius: 60,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: COLORS.goldenTransparent_05,
                }}
              >
                <TextInput
                  style={{
                    textAlign: "center",
                    paddingHorizontal: 22,
                    paddingVertical: 14.5,
                    textAlign: "center",
                    fontSize: 24,
                    fontFamily: "Mulish_400Regular",
                    color: COLORS.golden,
                    width: 59,
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={secondInput}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 2: text });
                    text
                      ? thirdInput.current.focus()
                      : firstInput.current.focus();
                  }}
                />
              </View>
              <View
                style={{
                  borderRadius: 60,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: COLORS.goldenTransparent_05,
                }}
              >
                <TextInput
                  style={{
                    textAlign: "center",
                    paddingHorizontal: 22,
                    paddingVertical: 14.5,
                    textAlign: "center",
                    fontSize: 24,
                    fontFamily: "Mulish_400Regular",
                    color: COLORS.golden,
                    width: 59,
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={thirdInput}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 3: text });
                    text
                      ? fourthInput.current.focus()
                      : secondInput.current.focus();
                  }}
                />
              </View>
              <View
                style={{
                  borderRadius: 60,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: COLORS.goldenTransparent_05,
                }}
              >
                <TextInput
                  style={{
                    textAlign: "center",
                    paddingHorizontal: 22,
                    paddingVertical: 14.5,
                    textAlign: "center",
                    fontSize: 24,
                    fontFamily: "Mulish_400Regular",
                    color: COLORS.golden,
                    width: 59,
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={fourthInput}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 4: text });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  ...FONTS.Mulish_400Regular,
                  fontSize: 16,
                  color: COLORS.gray,
                  lineHeight: 16 * 1.7,
                }}
              >
                ¿No recibiste el código de verificación?
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  ...FONTS.Mulish_400Regular,
                  fontSize: 16,
                  color: COLORS.black,
                  lineHeight: 16 * 1.7,
                  marginTop: -37,
                }}
              >
                Reenviar código
              </Text>
            </TouchableOpacity>
            <Button title="Verificar" onPress={() => verificarCodigo()} />
          </ContainerComponent>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      {renderContent()}
    </SafeAreaView>
  );
}
