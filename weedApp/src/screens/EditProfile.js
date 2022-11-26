import { SafeAreaView, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { EyeOff, Check } from "../svg";
import DatePicker from "react-native-modern-datepicker";
import DropDownPicker from "react-native-dropdown-picker";
import AnimatedLoader from "react-native-animated-loader";
import ImagesService from "../service/ImagesService";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";
import PacienteService from "../service/PacienteService";

export default function EditProfile() {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState("");
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
  const [imagen, setImagen] = useState("");

  const [imagenId, setImagenId] = useState("a");
  const [file, setFile] = useState(undefined);

  React.useEffect(() => {
    llave();
  }, []);

  const llave = async () => {
    try {
      let result = await SecureStore.getItemAsync("user");
      //console.log(result)
      if (result) {
        setUsuario(JSON.parse(result).persona);
        await traerFoto(JSON.parse(result));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const traerFoto = async (data) => {
    setImagenId(data?.imagen);
    let im = await ImagesService.getImage(data?.imagen);
    setImagen(im);
  };

  const handlePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      try {
        const data = new FormData();
        data.append("foto", {
          name: result.uri.split("ImagePicker/")[1],
          type: `image/${result.uri.split("ImagePicker/")[1].split(".")[1]}`,
          uri:
            Platform.OS === "ios"
              ? result.uri.replace("file://", "")
              : result.uri,
        });

        setFile(data);
      } catch (error) {
        console.log(error);
      }

      setImagen(result.uri);
    }
  };

  const updateProfile = async () => {
    try {
      const data = usuario;

      if (file != undefined) {
        const imagen = await ImagesService.uploadRN(file);
        data.imagen = imagen.key;
      } else {
        data.imagen = imagenId;
      }

      console.log(data);
      await PacienteService.update(data);
      showMessage({
        message: `Perfil actualizado`,
        type: "success",
      });
      //   navigation.navigate("MainLayout");
    } catch (error) {
      console.log(error);
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
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={{ uri: imagen }}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                borderRadius: 50,
                marginBottom: 35,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
            }}
          >
            Nombre
          </Text>
          <InputField
            value={usuario?.nombre}
            onChangeText={(e) => setUsuario({ ...usuario, nombre: e })}
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
            value={usuario?.ape_paterno}
            onChangeText={(e) => setUsuario({ ...usuario, ape_paterno: e })}
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
            value={usuario?.ape_materno}
            onChangeText={(e) => setUsuario({ ...usuario, ape_materno: e })}
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
            value={usuario?.sexo ? usuario?.sexo : ""}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={(itemValue, itemIndex) => {
              setUsuario({ ...usuario, sexo: itemValue });
              setSexo(itemValue);
            }}
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
            placeholder="Telefono"
            keyboardType="numeric"
            containerStyle={{ marginBottom: 10 }}
            //icon={<Check color={COLORS.gray} />}
            value={usuario?.telefono}
            onChangeText={(e) => setUsuario({ ...usuario, telefono: e })}
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
            value={usuario?.correo}
            onChangeText={(e) => setUsuario({ ...usuario, correo: e })}
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
            Nueva Contrase&ntilde;a
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
          {/* <Text
            style={{
              ...FONTS.Mulish_400Regular,
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
            }}
          >
            Confirmar Contrase&ntilde;a
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
          /> */}
          <Button title="Guardar Cambios" onPress={() => updateProfile()} />
        </ContainerComponent>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Editar Perfil" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
