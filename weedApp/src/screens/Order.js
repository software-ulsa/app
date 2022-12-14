import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, ContainerComponent, RatingComponent } from "../components";
import { AREA, COLORS, FONTS, SIZES } from "../constants";
import EspecialistaService from "../service/EspecialistaService";
import ImagesService from "../service/ImagesService";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function Order() {
  const navigation = useNavigation();

  const [especialista, setEspecialista] = useState([]);
  const [fotos, setFotos] = useState([]);

  const llamarEspecialistas = async () => {
    try {
      const espe = await EspecialistaService.getAll();
      let photo = [];
      for (let es in espe) {
        if (espe[es]?.usuario?.imagen === "") {
          let im =
            "https://thumbs.dreamstime.com/b/retrato-del-de-medio-cuerpo-doctor-placeholder-defecto-113622206.jpg";
          photo.push(im);
        } else {
          let im = await ImagesService.getImage(espe[es]?.usuario?.imagen);
          photo.push(im);
        }
      }

      setFotos(photo);
      setEspecialista(espe);
    } catch (error) {
      console.log(error);
    }
  };

  const navegar = (item) => {
    navigation.navigate("EspecialistaDetails", { especialista: item });
  };

  useEffect(() => {
    llamarEspecialistas();
  }, []);

  const getUri = async (key) => {
    let im = await ImagesService.getImage(key);
    return im;
  };

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ContainerComponent
          containerStyle={{
            backgroundColor: COLORS.goldenTransparent_04,
            borderRadius: 10,
            marginBottom: 15,
            paddingTop: 5,
          }}
        >
          <View
            duration={400}
            style={{
              paddingVertical: 10,
              marginHorizontal: 0,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...FONTS.Mulish_600SemiBold,
                fontSize: 16,
                color: COLORS.black,
                alignSelf: "center",
              }}
            >
              Conoce nuestro equipo de profesionales
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              paddingTop: 9,
              paddingBottom: 0,
              borderTopWidth: 1,
              borderTopColor: "#E8E8E8",
            }}
            transition="backgroundColor"
          >
            <Text
              style={{
                color: COLORS.gray,
                ...FONTS.Roboto_400Regular,
                fontSize: 14,
                lineHeight: 15 * 1.5,
                textAlign: "justify",
              }}
            >
              Al asegurar que nuestros clientes sean constantes, nuestro valor
              diferenciador es efectivamente especial y adecuado a tu perfil,
              por esto los ayudamos a contactar a los mejores en cada ??rea.
            </Text>
          </View>
        </ContainerComponent>
        {especialista.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navegar(item);
              }}
              style={{
                backgroundColor: COLORS.white,
                marginBottom: 15,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                flexDirection: "row",
              }}
            >
              <ImageBackground
                source={{ uri: fotos[index] }}
                style={{
                  width: 100,
                  height: 100,
                }}
                imageStyle={{ borderRadius: 10 }}
              ></ImageBackground>
              <View
                style={{
                  paddingVertical: 9,
                  paddingHorizontal: 15,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    ...FONTS.Mulish_600SemiBold,
                    fontSize: 14,
                    color: COLORS.black,
                    lineHeight: 14 * 1.2,
                    marginBottom: 6,
                    textTransform: "capitalize",
                  }}
                  numberOfLines={1}
                >
                  Dr. {item?.usuario?.persona?.nombre + " "}
                  {item?.usuario?.persona?.ape_paterno + " "}
                  {item?.usuario?.persona?.ape_materno + " "}
                </Text>
                <Text
                  style={{
                    ...FONTS.Mulish_400Regular,
                    fontSize: 12,
                    color: COLORS.gray,
                  }}
                >
                  Especialidad: {item?.especialidad?.nombre}
                </Text>
                <View
                  style={{
                    height: 1,
                    width: SIZES.width * 0.45,
                    backgroundColor: "#E9E9E9",
                    marginVertical: 10,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.Mulish_600SemiBold,
                    fontSize: 12,
                    color: COLORS.carrot,
                  }}
                >
                  Cel: {item?.usuario?.persona?.telefono}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <SafeAreaView
      style={{ ...AREA.AndroidSafeArea, paddingTop: getStatusBarHeight() }}
    >
      <Header
        title="Nuestros Especialistas"
        onPress={() => navigation.goBack()}
      />
      {renderContent()}
    </SafeAreaView>
  );
}

{
  /*
<ContainerComponent>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.black,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            Subtotal
                        </Text>
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.black,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            $45.98
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.gray,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            Discount
                        </Text>
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.gray,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            -4.29
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 18,
                                color: COLORS.black,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            Total
                        </Text>
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 18,
                                color: COLORS.black,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            $41.69
                        </Text>
                    </View>
                    <Button
                        title="Checkout"
                        containerStyle={{ marginTop: 35 }}
                        onPress={() => navigation.navigate("Checkout")}
                    />
                </ContainerComponent>

                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.white,
                        alignSelf: "flex-start",
                        paddingHorizontal: 18,
                        paddingVertical: 3,
                        borderRadius: 40,
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 25,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            textTransform: "capitalize",
                            lineHeight: 16 * 1.7,
                            color: COLORS.black,
                            paddingRight: 10,
                        }}
                    >
                        Promocode applied
                    </Text>
                    <Check color={COLORS.green} />
                </TouchableOpacity>
    */
}
