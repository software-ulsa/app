import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { COLORS, FONTS, SIZES } from "../constants";
import { Button } from "../components";
import { ArrowFive, BackSvg, HeartTwoSvg, RatingSvg } from "../svg";
import ImagesService from "../service/ImagesService";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function EspecialistaDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { especialista } = route.params;
  const [imagen, setImagen] = useState(
    "https://thumbs.dreamstime.com/b/retrato-del-de-medio-cuerpo-doctor-placeholder-defecto-113622206.jpg"
  );

  useEffect(() => {
    darImagen();
  }, []);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const darImagen = async () => {
    if (especialista?.usuario?.imagen === "") {
      let im =
        "https://thumbs.dreamstime.com/b/retrato-del-de-medio-cuerpo-doctor-placeholder-defecto-113622206.jpg";
      setImagen(im);
    } else {
      const im = await ImagesService.getImage(especialista?.usuario?.imagen);
      setImagen(im);
    }
  };
  function updateCurrentSlideIndex(e) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  }

  function renderDots() {
    return (
      <View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View
            key={0}
            style={[
              styles.dot,
              currentSlideIndex == 0 && {
                width: 22,
              },
            ]}
          />
        </View>
      </View>
    );
  }

  function renderSlide() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            zIndex: 1,
            paddingHorizontal: 20,
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            width: SIZES.width,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackSvg />
          </TouchableOpacity>
          <TouchableOpacity>
            <HeartTwoSvg />
          </TouchableOpacity>
        </View>

        <ImageBackground
          style={{ width: SIZES.width, height: "100%" }}
          source={{ uri: imagen }}
        ></ImageBackground>
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={{ backgroundColor: "#EFEDE6" }}>
        {renderDots()}
        <View
          style={{
            width: SIZES.width,
            height: 15,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            position: "absolute",
            top: -15,
            backgroundColor: COLORS.white,
            zIndex: 9,
            backgroundColor: "#EFEDE6",
          }}
        />
        <View
          style={{
            paddingVertical: 30,
            paddingTop: 10,
            backgroundColor: "#EFEDE6",
            width: "100%",
            paddingHorizontal: 35,
          }}
        >
          <Text
            style={{
              ...FONTS.Mulish_700Bold,
              fontSize: 22,
              textAlign: "center",
              textTransform: "capitalize",
              lineHeight: 22 * 1.2,
              marginBottom: 9,
              color: COLORS.black,
            }}
          >
            {especialista?.usuario?.persona?.nombre + " "}
            {especialista?.usuario?.persona?.ape_paterno + " "}
            {especialista?.usuario?.persona?.ape_materno + " "}
          </Text>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_600SemiBold,
              fontSize: 18,
              color: COLORS.black,
              marginBottom: 19,
            }}
          >
            Especialidad: {especialista?.especialidad?.nombre}
          </Text>
          <ScrollView>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 15,
                  color: COLORS.gray,
                  marginBottom: 15,
                }}
              >
                C??dula profesional: {especialista?.cedula_prof}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 15,
                  color: COLORS.gray,
                  marginBottom: 15,
                }}
              >
                Tel??fono directo: {especialista?.usuario?.persona?.telefono}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 15,
                  color: COLORS.gray,
                  marginBottom: 15,
                }}
              >
                Correo: {especialista?.usuario?.persona?.correo}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 15,
                  color: COLORS.gray,
                  marginBottom: 15,
                }}
              >
                Direcci??n: {especialista?.domicilio?.calle + " "}
                {especialista?.domicilio?.colonia + ". "}
                {especialista?.domicilio?.estado + ", "}
                {especialista?.domicilio?.codigo_postal + " "}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EFEDE6",
        paddingTop: getStatusBarHeight(),
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: "#EFEDE6",
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ height: "50%" }}>{renderSlide()}</View>
        <View style={{ height: "50%" }}>{renderContent()}</View>
      </ScrollView>
      <View
        style={{
          marginBottom: 25,
          marginHorizontal: 20,
          flexDirection: "row",
        }}
      >
        <Button
          title="Contactar"
          containerStyle={{ width: "50%", marginHorizontal: 2 }}
          onPress={() => {
            navigation.navigate("ChatEspecialista", {
              especialista: especialista,
            });
          }}
        />
        <Button
          title="Agendar Cita"
          containerStyle={{ width: "50%", marginHorizontal: 2 }}
          onPress={() => {
            navigation.navigate("AgendarCita");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 2,
    top: -50,
  },
});
