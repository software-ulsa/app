import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES, AREA } from "../../constants";
import { Button } from "../../components";
import { ArrowFive, BackSvg, HeartTwoSvg, RatingSvg } from "../../svg";
import { Header } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";

export default function DetalleNotas() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;
  // console.log(data)
  const [imagen, setImagen] = useState(
    "https://thumbs.dreamstime.com/b/retrato-del-de-medio-cuerpo-doctor-placeholder-defecto-113622206.jpg"
  );

  const getNotaDetalle = async () => {
    try {
    } catch (error) {
      showMessage({
        message: "Ah ocurrido un error",
        type: "warning",
      });
    }
  };

  function renderSlide() {
    return (
      <View style={{ flex: 1  }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            zIndex: 1,
            paddingHorizontal: 20,
            marginTop: 15,
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
          style={{ width: SIZES.width, height: "90%" }}
          source={{ uri: data?.foto_principal }}
        ></ImageBackground>
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={{ backgroundColor: "#EFEDE6", marginTop: -140,}}>
        <View
          style={{
            width: SIZES.width,
            height: 15,
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
            position: "absolute",
            // top: 150,
            backgroundColor: COLORS.white,
            zIndex: 9,
            // backgroundColor: "red",
          }}
        />
        <View
          style={{
            paddingVertical: 30,
            // paddingBottom: 10,
            backgroundColor: "#EFEDE6",
            width: "100%",
            paddingHorizontal: 30,
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
            {data?.titulo} 
          </Text>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_600SemiBold,
              fontSize: 13,
              color: COLORS.gray,
              // marginBottom: 19,
            }}
          >
            {data?.tema} v
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
            Área de especialidad: xD
          </Text>
          <View style={{ marginBottom: 25, alignSelf: "center" }}>
            <RatingSvg />
          </View>

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
                marginBottom: 19,
              }}
            >
              Cedula profesional: asdasd
            </Text>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_600SemiBold,
                fontSize: 15,
                color: COLORS.gray,
                marginBottom: 19,
              }}
            >
              Teléfono directo: asdasd
            </Text>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_600SemiBold,
                fontSize: 15,
                color: COLORS.gray,
                marginBottom: 19,
              }}
            >
              Teléfono de oficina: asdasd
            </Text>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_600SemiBold,
                fontSize: 15,
                color: COLORS.gray,
                marginBottom: 19,
              }}
            >
              Correo: asdasdasd
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#EFEDE6" }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: "#EFEDE6",
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ height: "60%" }}>{renderSlide()}</View>
        <View style={{ height: "40%" }}>{renderContent()}</View>
      </ScrollView>
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
