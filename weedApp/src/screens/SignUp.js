import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import AnimatedLoader from "react-native-animated-loader";
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { EyeOff, Check } from "../svg";
import DatePicker from "react-native-modern-datepicker";
import DropDownPicker from "react-native-dropdown-picker";
import UsuarioService from "../service/UsuarioService";



export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [matricula, setMatricula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
    { label: "No binario", value: "No binario" },
  ]);
  const [visible, setVisible] = useState(true);

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  const registrarUsuario = async () => {
    try {
      const arrayFecha = fechaNacimiento.split("/");
      const edad = calcularEdad(arrayFecha[2], arrayFecha[1], arrayFecha[0]);
      const usuarioInfo = {
        nombre: name,
        ape_paterno: apePat,
        ape_materno: apeMat,
        correo: email,
        password: password,
        telefono: telefono,
        edad: edad,
        id_rol: 2,
        sexo: sexo,
        foto_perfil: "",
        matricula: matricula,
      };
      // console.log(usuarioInfo)

      const userSave = await UsuarioService.create(usuarioInfo);
      console.log(userSave);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("ConfirmationCode");
  };

  const calcularEdad = (birthDay, birthMonth, birthYear) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const calculatedAge = currentYear - birthYear;

    if (currentMonth < birthMonth - 1) {
      calculatedAge--;
    }
    if (birthMonth - 1 == currentMonth && currentDay < birthDay) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  function renderContent() {
    return (
      <>
        {!visible ? (
          <AnimatedLoader
            visible={visible}
            overlayColor="rgba(255,255,255,0.75)"
            animationStyle={styles.lottie}
            speed={1}
          >
            <Text>Registrandote ...</Text>
          </AnimatedLoader>
        ) : (
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
                // icon={<Check color={COLORS.gray} />}
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
                Sexo
              </Text>

              <DropDownPicker
                style={{
                  width: "100%",
                  height: 50,
                  borderWidth: 1,
                  borderRadius: 25,
                  paddingHorizontal: 25,
                  borderColor: COLORS.goldenTransparent_03,

                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: COLORS.goldenTransparent_01,
                }}
                labelProps={{
                  style: { color: COLORS.gray },
                }}
                placeholder="Selecciona una opcion"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(itemValue, itemIndex) => setSexo(itemValue)}
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
                Telefono
              </Text>

              <InputField
                value={telefono}
                onChangeText={setTelefono}
                placeholder="Telefono"
                keyboardType="numeric"
                containerStyle={{ marginBottom: 10 }}
                //icon={<Check color={COLORS.gray} />}
              />

              <DatePicker
                date={date}
                onDateChange={(evento) => setFechaNacimiento(evento)}
                mode="date"
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

              <Text
                style={{
                  ...FONTS.Mulish_400Regular,
                  color: COLORS.gray,
                  fontSize: 16,
                  lineHeight: 16 * 1.7,
                  marginBottom: 5,
                }}
              >
                Correo
              </Text>

              <InputField
                placeholder="kristinwatson@mail.com"
                containerStyle={{ marginBottom: 20 }}
                icon={<Check color={COLORS.gray} />}
                onChangeText={setEmail}
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
              <Button title="Siguiente" onPress={() => registrarUsuario()} />
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
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Registrate" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
