import {
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image,
} from "react-native";
import React, { useState } from "react";
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

export default function NewCard() {
  const navigation = useNavigation();
  const richText = React.useRef();

  const [palabras, setPalabras] = useState([]);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
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
              alignSelf:'center'
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
            <RichToolbar
              editor={richText}
              style={{
                backgroundColor: COLORS.goldenTransparent_03,
                borderColor: COLORS.goldenTransparent_01,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderWidth: 1,
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
            <ScrollView>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
                <RichEditor
                  style={{
                    //borderColor: COLORS.golden,
                    borderWidth: 0.5,
                    borderBottomColor: COLORS.golden,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderLeftColor: COLORS.golden,
                    borderRightColor: COLORS.golden,
                    borderTopColor: COLORS.transparent,
                  }}
                  ref={richText}
                  initialHeight={150}
                  onChange={(descriptionText) => {
                    console.log("descriptionText:", descriptionText);
                  }}
                />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>

          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <ReactChipsInput
              label="Palabras Clave"
              initialChips={["Apple", "Orange"]}
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
