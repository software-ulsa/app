import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Button, Header, Line, RatingComponent } from "../components";
import { AREA, COLORS, FONTS, products } from "../constants";
import { BagSvg, FavoriteSvg } from "../svg";
import MisNotas from "./notas/MisNotas";

export default function WishList() {
  const navigation = useNavigation();

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <Button
          title="Crear Una Nota"
          containerStyle={{ marginBottom: 25, marginHorizontal: 20 }}
          onPress={() => navigation.navigate("NewCard")}
        />
        <MisNotas />
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Mis Notas" goBack={false} />
      {renderContent()}
    </SafeAreaView>
  );
}
