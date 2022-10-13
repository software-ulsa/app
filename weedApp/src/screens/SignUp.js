import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { EyeOff, Check } from "../svg";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [matricula, setMatricula] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

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
              textAlign: "left",
              ...FONTS.H6,
              color: COLORS.lightGray,
              marginBottom: -5,
              marginTop: -25,
            }}
          >
            Paso 1 de 3
          </Text>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.H2,
              color: COLORS.black,
              marginBottom: 30,
              lineHeight: 32 * 1.2,
              textTransform: "capitalize",
            }}
          >
            Información basica
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
            Nombre(s)
          </Text>
          <InputField
            value={name}
            onChangeText={setName}
            placeholder="Nombre"
            containerStyle={{ marginBottom: 10 }}
            //icon={<Check color={COLORS.gray} />}
          />
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
            }}
          >
            Primer Apellido
          </Text>
          <InputField
            value={apePat}
            onChangeText={setApePat}
            placeholder="Apellido"
            containerStyle={{ marginBottom: 10 }}
            //icon={<Check color={COLORS.gray} />}
          />
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
            }}
          >
            Segundo Apellido
          </Text>
          <InputField
            value={apeMat}
            onChangeText={setApeMat}
            placeholder="Apellido"
            containerStyle={{ marginBottom: 10 }}
            //icon={<Check color={COLORS.gray} />}
          />
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
            }}
          >
            Matricula
          </Text>

          <InputField
            value={matricula}
            onChangeText={setMatricula}
            placeholder="Matricula"
            keyboardType="numeric"
            containerStyle={{ marginBottom: 10 }}
            //icon={<Check color={COLORS.gray} />}
          />
          <InputField
            placeholder="kristinwatson@mail.com"
            containerStyle={{ marginBottom: 20 }}
            icon={<Check color={COLORS.gray} />}
          />
          <InputField
            placeholder="••••••••"
            containerStyle={{ marginBottom: 20 }}
            icon={
              <TouchableOpacity>
                <EyeOff />
              </TouchableOpacity>
            }
          />
          <InputField
            placeholder="••••••••"
            containerStyle={{ marginBottom: 20 }}
            icon={
              <TouchableOpacity>
                <EyeOff />
              </TouchableOpacity>
            }
          />
          <Button
            title="Siguiente"
            onPress={() => navigation.navigate("VerifyPhoneNumber")}
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
            Ya tengo cuenta?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{
                ...FONTS.Mulish_400Regular,
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Inicia sesi&oacute;n.
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Registrate" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
