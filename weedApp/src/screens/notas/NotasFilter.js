import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS, products, FONTS } from "../../constants";
import { FilterSvg, SearchSvg, BagSvg, HeartSvg } from "../../svg";
import { Ionicons } from "@expo/vector-icons";
import NotasService from "../../service/NotaService";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import ImagesService from "../../service/ImagesService";
import { RatingComponent, Line } from "../../components";

export default function NotasFilter() {
  const navigation = useNavigation();
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagenes, setImagenes] = useState([]);
  const [filtro, setFiltro] = useState("");
 
  useEffect(() => {
    setImagenes([]);
    getNotas();
  }, [filtro]);

  const getNotas = async () => {
    try {
      setLoading(true);
      setImagenes([]);
      const ayuda = filtro;
      const result = await NotasService.getNotesByFilter(ayuda);

      for (const record of result) {
        if (record.imagen) {
          const result = await ImagesService.getImage(record?.imagen);
          setImagenes((imagenes) => [...imagenes, result]);
        } else {
          setImagenes((imagenes) => [
            ...imagenes,
            "https://via.placeholder.com/1125x1068",
          ]);
        }
      }
      setNotas(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  function renderSearch() {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 44,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <SearchSvg />
          </View>
          <TextInput
            // placeholder="Encontrar por..."
            style={{ flex: 1 }}
            value={filtro}
            onChangeText={(e) => setFiltro(e)}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flexGrow: 1,
      }}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        {renderSearch()}
        {loading ? (
          <View style={{ margin: 15 }}>
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
          </View>
        ) : (
          <View style={{ margin: 15 }}>
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

                    // marginRigth: "%"
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
                      height: "90%",
                      marginLeft: 4,
                      marginTop: 4,
                    }}
                    imageStyle={{ borderRadius: 10 }}
                  >
                    <Image style={{ width: 66, height: 58 }} source={{}} />
                    <Text
                      style={{
                        ...FONTS.P,
                        fontSize: 10,
                        textTransform: "capitalize",
                        marginLeft: 33,
                        marginTop: 23,
                      }}
                    >
                      {item?.tema}
                    </Text>
                  </ImageBackground>
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
                      {item?.contenido.replace(regex, "").slice(0, 29)}...
                    </Text>
                    <Line />
                    <Text
                      style={{
                        ...FONTS.Mulish_600SemiBold,
                        fontSize: 14,
                        color: COLORS.lightGray,
                      }}
                    >
                      Por: {item?.usuario?.persona?.nombre.split(" ")[0]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
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
    {/* <Circle cx="325" cy="30" r="11" />
    <Rect x="316" y="45" rx="0" ry="0" width="18" height="4" /> */}
  </ContentLoader>
);
