import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { EyeOff, Check, RememberSvg } from "../svg";
import DatePicker from "react-native-modern-datepicker";
import DropDownPicker from "react-native-dropdown-picker";
import UsuarioService from "../service/UsuarioService";
import { showMessage } from "react-native-flash-message";
import { AuthContext } from "../navigation/AppNavigation";
import CarreraService from "../service/CarreraService";
import PacienteService from "../service/PacienteService";

export default function SignUp() {
  const { signIn } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [matricula, setMatricula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
    { label: "No binario", value: "No binario" },
  ]);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleString());
  const [aceptar, setAceptar] = useState(false);
  const [carreras, setCarreras] = useState([]);

  const [openCarrera, setOpenCarrera] = useState(false);
  const [carrera_id, setCarrera_id] = useState(null);

  useEffect(() => {
    getCarreras();
  }, []);

  const getCarreras = async () => {
    try {
      const data = await CarreraService.getAll();
      data.map((carrera) => {
        setCarreras((carreras) => [
          ...carreras,
          { label: carrera?.abreviatura, value: carrera?.id },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const registrarUsuario = async () => {
    try {
      // Vamos a validar el correo y despues que no exista un usuario con ese mismo correo

      const arrayFecha = fechaNacimiento.split("/");
      const edad = calcularEdad(arrayFecha[2], arrayFecha[1], arrayFecha[0]);

      if (name.length <= 0) {
        return mostrarAlerta("Debes de colocar tu nombre", "warning");
      } else if (apePat.length <= 0) {
        return mostrarAlerta("Debes de colocar tu apellido paterno", "warning");
      } else if (apeMat.length <= 0) {
        return mostrarAlerta("Debes de colocar tu apellido materno", "warning");
      } else if (userName.length <= 0) {
        return mostrarAlerta(
          "Debes de colocar tu nombre de usuario",
          "warning"
        );
      } else if (sexo.length <= 0) {
        return mostrarAlerta("Debes de colocar tu sexo", "warning");
      } else if (telefono.length <= 9) {
        return mostrarAlerta("Debes de colocar un número válido", "warning");
      } else if (edad < 18) {
        return mostrarAlerta("Debes de ser mayor de edad", "warning");
      } else if (edad > 100) {
        return mostrarAlerta(
          "Debes de colocar una fecha de nacimiento válida",
          "warning"
        );
      } else if (email.length <= 5) {
        return mostrarAlerta("Debes de colocar un correo válido", "warning");
      } else if (!carrera_id) {
        return mostrarAlerta("Debes de seleccionar tu carrera", "warning");
      } else if (matricula < 9) {
        return mostrarAlerta(
          "Debes de colocar una matricula válida",
          "warning"
        );
      } else if (password.length <= 0) {
        return mostrarAlerta(
          "Debes de colocar una contraseña válida",
          "warning"
        );
      } else if (aceptar == false) {
        return mostrarAlerta(
          "Debes de aceptar los terminos y condiciones",
          "warning"
        );
      }

      const validateEmail = /\S+@\S+\.\S+/;
      if (!email) return "Necesitar colocar un correo valido.";
      if (!validateEmail.test(email))
        return "Por favor ingresa un correo valido.";

      const data = await UsuarioService.verifyCredentials({ email, userName });

      if (!data.personFound && !data.userFound) {
        setVisible(true);
        const usuarioInfo = {
          nombre: name,
          ape_paterno: apePat,
          ape_materno: apeMat,
          fecha_nac: fechaNacimiento,
          sexo: sexo,
          correo: email,
          telefono: telefono,
          username: userName,
          password: password,
          imagen: "",
          rol_id: 2,
          activo: false,
          matricula: matricula,
          carrera_id,
        };
        const userSave = await PacienteService.create(usuarioInfo);
        signIn(userSave.token, userSave.usuarioInsert);
        navigation.navigate("ConfirmationCode");
        setVisible(false);

        return mostrarAlerta("Tu cuenta ha sido creada", "success");
      } else if (data.personFound && data.userFound) {
        return mostrarAlerta("Correo y nombre de usuario en uso", "warning");
      } else if (data.personFound) {
        return mostrarAlerta("Correo eléctronico en uso", "warning");
      } else if (data.userFound) {
        return mostrarAlerta("Nombre de usuario en uso", "warning");
      }
    } catch (error) {
      console.log(error);
      return mostrarAlerta("Ha ocurrido un error al registrarte", "warning");
    }
  };

  const mostrarAlerta = (mensaje, tipo) => {
    showMessage({
      message: mensaje,
      type: tipo,
    });
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
        {visible ? (
          <>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "89%",
              }}
            >
              <Image
                style={{
                  width: 200,
                  height: 400,
                }}
                source={{
                  uri: "http://www.kidlo.com/html5_games/loading_for_game.gif",
                }}
              />
            </View>
          </>
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
                  textAlign: "center",
                  ...FONTS.H6,
                  color: COLORS.lightGray,
                  marginBottom: 5,
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
                Información Básica
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
                placeholder="Ej. Anna"
                fontStyle="italic"
                containerStyle={{ marginBottom: 10 }}
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
                Apellido paterno
              </Text>
              <InputField
                value={apePat}
                onChangeText={setApePat}
                placeholder="Ej. Rodriguez"
                fontStyle="italic"
                containerStyle={{ marginBottom: 10 }}
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
                Apellido materno
              </Text>
              <InputField
                value={apeMat}
                onChangeText={setApeMat}
                placeholder="Ej. Hernandez"
                fontStyle="italic"
                containerStyle={{ marginBottom: 10 }}
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
                Nombre de Usuario
              </Text>
              <InputField
                value={userName}
                onChangeText={setUsername}
                placeholder="Ej. NoobMaster69"
                fontStyle="italic"
                containerStyle={{ marginBottom: 10 }}
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
                  marginBottom: 5,

                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: COLORS.goldenTransparent_01,
                }}
                labelProps={{
                  style: { color: COLORS.black, fontStyle: "italic" },
                }}
                dropDownContainerStyle={{
                  borderColor: COLORS.gray,
                  backgroundColor: "#e8f4fc",
                }}
                placeholder="Selecciona una opción"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(itemValue) => setSexo(itemValue)}
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
                Teléfono
              </Text>

              <InputField
                value={telefono}
                onChangeText={setTelefono}
                placeholder="Ej. 9514206932"
                keyboardType="numeric"
                fontStyle="italic"
                containerStyle={{ marginBottom: 10 }}
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
                Fecha de nacimiento
              </Text>

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
                Carrera
              </Text>
              <DropDownPicker
                style={{
                  width: "100%",
                  height: 50,
                  borderWidth: 1,
                  borderRadius: 25,
                  paddingHorizontal: 25,
                  borderColor: COLORS.goldenTransparent_03,
                  marginBottom: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: COLORS.goldenTransparent_01,
                }}
                labelProps={{
                  style: { color: COLORS.black, fontStyle: "italic" },
                }}
                dropDownContainerStyle={{
                  borderColor: COLORS.gray,
                  backgroundColor: "#e8f4fc",
                }}
                placeholder="Selecciona una opción"
                open={openCarrera}
                value={carrera_id}
                items={carreras}
                setOpen={setOpenCarrera}
                setValue={setCarrera_id}
                setItems={setCarreras}
                onChangeValue={(itemValue, itemIndex) =>
                  setCarrera_id(itemValue)
                }
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
                placeholder="Ej. 014419799"
                keyboardType="numeric"
                fontStyle="italic"
                containerStyle={{ marginBottom: 10 }}
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
                placeholder="Ej. noobMaster@gmail.com"
                value={email}
                fontStyle="italic"
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

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 30,
                }}
              >
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => setAceptar(!aceptar)}
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
                    {aceptar && <RememberSvg />}
                  </View>

                  <Text
                    style={{
                      ...FONTS.Mulish_400Regular,
                      fontSize: 16,
                      color: COLORS.gray,
                      lineHeight: 16 * 1.7,
                    }}
                  >
                    Acepto
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("AvisoPrivacidad")}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_400Regular,
                      fontSize: 16,
                      marginEnd: 60,
                      color: COLORS.goldenTransparent_05,
                    }}
                  >
                    términos y condiciones
                  </Text>
                </TouchableOpacity>
              </View>
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
                ¿Ya tienes cuenta?{" "}
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
    <SafeAreaView
      style={{ ...AREA.AndroidSafeArea, paddingTop: getStatusBarHeight() }}
    >
      <Header title="Regístrate" onPress={() => navigation.goBack()} />
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
