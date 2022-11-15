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

export default function NewCard() {
  const navigation = useNavigation();
  const richText = React.createRef() || useRef();

  const [palabras, setPalabras] = useState([]);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      try {
        const data = new FormData();

        data.append("foto", {
          name: result.fileName,
          type: result.type,
          uri:
            Platform.OS === "ios"
              ? result.uri.replace("file://", "")
              : result.uri,
        });
        const re = await ImagesService.upload(data);
        // fetch(`http://194.195.86.77:8080/imagenes`, {
        //   method: "POST",
        //   body: data,
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     "auth-token":
        //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29ycmVvIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjY0NzQ3MjkxfQ.1O3Jysk15yt2gxdn4aGPAEEopC3p2-haMky_lhieIFY",
        //     Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29ycmVvIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjY0NzQ3MjkxfQ.1O3Jysk15yt2gxdn4aGPAEEopC3p2-haMky_lhieIFY',
        //   },
        //   Connection: "keep-alive",
        // })
        //   .then((response) => response.json())
        //   .then((response) => {
        //     console.log("response", response);
        //   })
        //   .catch((error) => {
        //     console.log("error", error);
        //   });
        console.log(re);
      } catch (error) {
        console.log(error);
      }

      setImage(result.uri);
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
            Titulo
          </Text>
          <InputField
            placeholder="Titulo"
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
            Tema
          </Text>
          <InputField
            placeholder="Tema"
            containerStyle={{ marginBottom: 10 }}
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
                  //androidHardwareAccelerationDisabled={false}
                  //editorInitializedCallback={() => this.onEditorInitialized()}
                  onChange={(descriptionText) => {
                    console.log("descriptionText:", descriptionText);
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
              onChangeChips={(chips) => console.log(chips)}
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
            //onPress={() => navigation.navigate("PaymentMethod")}
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
