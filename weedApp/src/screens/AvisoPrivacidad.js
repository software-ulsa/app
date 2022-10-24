import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Briefcase } from "../svg";

export default function AvisoPrivacidad() {
  const navigation = useNavigation();

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          justifyContent: "center",
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
              marginBottom: 14,
              textTransform: "capitalize",
            }}
          >
            Aviso de privacidad
          </Text>
          <Text
            style={{
              textAlign: "justify",
              ...FONTS.Mulish_400Regular,
              fontSize: 16,
              color: COLORS.gray,
              paddingHorizontal: 20,
              lineHeight: 16 * 1.7,
              marginBottom: 30,
            }}
          >
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like).
          </Text>
        </ContainerComponent>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Aviso de privacidad" goBack={true} onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
