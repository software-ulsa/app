import {
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import ReactChipsInput from "react-native-chips";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import ImagesService from "../service/ImagesService";
import * as SecureStore from "expo-secure-store";
import NotasService from "../service/NotaService";
import { showMessage } from "react-native-flash-message";

export default function NewCard() {
  const navigation = useNavigation();
  const richText = React.createRef() || useRef();

  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(undefined);

  const pickImage = async () => {
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

        // await ImagesService.uploadRN(data);
        setFile(data);
      } catch (error) {
        console.log(error);
      }

      setImage(result.uri);
    }
  };

  const subirNota = async () => {
    try {
      const nota = data;
      const usuario = await SecureStore.getItemAsync("user");
      nota.usuario_id = parseInt(JSON.parse(usuario).id);
      nota.estado = "Pendiente";
      //

      const imagen = await ImagesService.uploadRN(file);
      nota.imagen = imagen.key;

      await NotasService.create(nota);

      navigation.navigate("MainLayout");
      showMessage({
        message: `Nota creada con exito`,
        type: "success",
      });
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
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              color: COLORS.black,
              fontSize: 20,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
              alignSelf: "center",
            }}
          >
            Crea tu nota
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
            Título
          </Text>
          <InputField
            placeholder="Título"
            containerStyle={{ marginBottom: 10 }}
            value={data?.titulo}
            onChangeText={(e) => setData({ ...data, titulo: e })}
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
            Tema
          </Text>
          <InputField
            placeholder="Tema"
            containerStyle={{ marginBottom: 10 }}
            value={data?.tema}
            onChangeText={(e) => setData({ ...data, tema: e })}
            //icon={<Check color={COLORS.gray} />}
          />
          <View style={{ margin: 10 }}>
            <Button title="Quiero Una Subir Imagen" onPress={pickImage} />
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: "center",
                  margin: 15,
                }}
              />
            )}
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text
              style={{
                ...FONTS.Mulish_400Regular,
                color: COLORS.gray,
                fontSize: 16,
                lineHeight: 16 * 1.7,
                marginBottom: 5,
              }}
            >
              ¿Qué estoy pensando?
            </Text>

            <ScrollView>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
                <RichEditor
                  style={{
                    //borderColor: COLORS.golden,
                    borderWidth: 0.7,
                    borderBottomColor: COLORS.golden,
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                    borderLeftColor: COLORS.golden,
                    borderRightColor: COLORS.golden,
                    borderTopColor: COLORS.golden,
                  }}
                  ref={richText}
                  initialHeight={150}
                  androidHardwareAccelerationDisabled={true}
                  //editorInitializedCallback={() => this.onEditorInitialized()}
                  onChange={(descriptionText) => {
                    setData({ ...data, contenido: descriptionText });
                  }}
                />
              </KeyboardAvoidingView>
            </ScrollView>
            <RichToolbar
              editor={richText}
              style={{
                backgroundColor: COLORS.goldenTransparent_03,
                borderColor: COLORS.goldenTransparent_01,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                //borderWidth: 1,
              }}
              selectedIconTint="#873c1e"
              iconTint="#312921"
              actions={[
                //actions.insertImage,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertLink,
                actions.setStrikethrough,
                actions.setUnderline,
              ]}
            />
          </View>

          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <ReactChipsInput
              label="Palabras Clave"
              //initialChips={["Apple", "Orange"]}
              onChangeChips={(chips) => {
                setData({ ...data, palabras_clave: chips });
              }}
              //alertRequired={true}
              chipStyle={{
                borderColor: COLORS.golden,
                backgroundColor: COLORS.goldenTransparent_01,
              }}
              inputStyle={{ fontSize: 12 }}
              labelStyle={{ color: COLORS.gray }}
              labelOnBlur={{ color: "#666" }}
            />
          </View>

          <Button
            title="Subir nota"
            containerStyle={{ marginTop: 25 }}
            onPress={() => subirNota()}
          />
        </ContainerComponent>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Creando mi nota" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
