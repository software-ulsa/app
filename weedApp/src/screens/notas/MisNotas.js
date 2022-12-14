import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { COLORS, products, FONTS } from "../../constants";
import { RatingComponent, Line } from "../../components";
import { BagSvg, HeartSvg } from "../../svg";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import NotasService from "../../service/NotaService";
import HTMLView from "react-native-htmlview";
import { useRoute, useNavigation } from "@react-navigation/native";
import ImagesService from "../../service/ImagesService";
import * as SecureStore from "expo-secure-store";

export default function MisNotas() {
  const navigation = useNavigation();
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    getNotas();
  }, []);

  const getNotas = async () => {
    try {
      const data = await SecureStore.getItemAsync("user");

      const result = await NotasService.getNotasByUser(
        parseInt(JSON.parse(data).id)
      );

      for (const record of result) {
        const result = await ImagesService.getImage(record?.imagen);
        setImagenes((imagenes) => [...imagenes, result]);
      }

      setNotas(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ paddingHorizontal: 0 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            ...FONTS.Mulish_700Bold,
            fontSize: 20,
            textTransform: "capitalize",
            color: COLORS.black,
            lineHeight: 20 * 1.2,
          }}
        ></Text>
      </View>
      {loading ? (
        <>
          {products.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: "100%",
                  height: 100,
                  backgroundColor: COLORS.white,
                  marginBottom: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                }}
              >
                <MyLoader />
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <>
          {notas.map((item, index) => {
            const regex = /<[^>]*>/gim;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: "100%",
                  height: 100,
                  backgroundColor: COLORS.white,
                  marginBottom: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                }}
                onPress={() =>
                  navigation.navigate("DetalleNotas", {
                    data: item,
                    imagen: imagenes[index],
                  })
                }
              >
                <ImageBackground
                  source={{
                    uri: imagenes[index],
                  }}
                  style={{
                    width: 100,
                    height: "95%",
                    marginLeft: 4,
                    marginTop: "auto",
                  }}
                  imageStyle={{ borderRadius: 10 }}
                ></ImageBackground>
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      textTransform: "capitalize",
                      marginBottom: 6,
                    }}
                  >
                    {item?.titulo.length <= 28
                      ? item?.titulo
                      : `${item?.titulo.slice(0, 25)}...`}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.Mulish_400Regular,
                      fontSize: 14,
                    }}
                  >
                    {item?.contenido
                      .replace(regex, "")
                      .replace(/<(.|\n)*?>/g, "")
                      .replace(/&nbsp;/g, "")
                      .replace(/(\r\n|\n|\r)/gm, " ")
                      .trim()
                      .slice(0, 28)}
                    ...
                  </Text>
                  <Line />
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      color: `${
                        item?.estado == "Aceptado" ? "green" : "orange"
                      }`,
                    }}
                  >
                    {item?.estado}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    width: 30,
                    height: 30,
                    right: 15,
                    bottom: 11,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    showMessage({
                      message: `${item?.name} has been added`,
                      type: "info",
                    });
                  }}
                >
                  {/* <BagSvg /> */}
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </View>
  );
}

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="518" y="192" rx="3" ry="3" width="380" height="6" />
    <Rect x="498" y="206" rx="3" ry="3" width="178" height="6" />
    <Rect x="85" y="21" rx="0" ry="0" width="133" height="16" />
    <Rect x="86" y="46" rx="0" ry="0" width="200" height="15" />
    <Rect x="85" y="72" rx="0" ry="0" width="78" height="14" />
    <Rect x="26" y="82" rx="0" ry="0" width="20" height="9" />
    <Circle cx="36" cy="45" r="31" />
    {/* <Circle cx="325" cy="30" r="11" /> */}
    {/* <Rect x="316" y="45" rx="0" ry="0" width="18" height="4" /> */}
  </ContentLoader>
);
