import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { promo, SIZES, COLORS, products, FONTS } from "../constants";
import { RatingComponent, Line } from "../components";
import { BagSvg, HeartSvg } from "../svg";
import { AuthContext } from "../navigation/AppNavigation";
import CursoService from "../service/CursosService";
import ItemNoticia from "./notas/ItemNoticia";
import ItemPublicidad from "./publicidad/ItemPublicidad";
import * as SecureStore from "expo-secure-store";
import ImagesService from "../service/ImagesService";

export default function Home() {
  const navigation = useNavigation();

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [arrayFalso, setArray] = useState([1, 2, 3, 4, 5]);
  const [currentUser, setCurrentUser] = useState([]);
  const [imagenes, setImagenes] = useState([]);

  function updateCurrentSlideIndex(e) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  }

  const llamarCursos = async () => {
    try {
      let result = await SecureStore.getItemAsync("user");
      setCurrentUser(result);
      const cur = await CursoService.getAll();
      setCursos(await cur.slice(0, 5));

      for (const record of cur) {
        if (record.imagen) {
          const imagen = await ImagesService.getImage(record.imagen);
          setImagenes((imagenes) => [...imagenes, imagen]);
        } else {
          setImagenes((imagenes) => [
            ...imagenes,
            "https://vilmanunez.com/wp-content/uploads/2016/03/herramientas-y-recursos-para-crear-curso-online.png",
          ]);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error cursos home");
    }
  };

  React.useEffect(() => {
    llamarCursos();
  }, []);

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
          {promo.map((_, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlideIndex == index && {
                    width: 22,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  }

  const MyLoaderCurso = (props) => (
    <ContentLoader
      speed={2}
      width={266}
      height={280}
      //style={{padding:15, margin:5}}
      viewBox="0 15 265 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <Rect x="25" y="130" rx="3" ry="3" width="88" height="6" />
      <Rect x="25" y="120" rx="3" ry="3" width="55" height="6" />
      <Rect x="25" y="152" rx="3" ry="3" width="210" height="3" />
      <Rect x="25" y="162" rx="3" ry="3" width="210" height="3" />
      <Rect x="25" y="172" rx="3" ry="3" width="210" height="3" />
      <Rect x="25" y="182" rx="3" ry="3" width="210" height="3" />
      <Rect x="25" y="192" rx="3" ry="3" width="210" height="3" />
      <Rect x="543" y="198" rx="0" ry="0" width="69" height="72" />
      <Rect x="25" y="0" rx="0" ry="0" width="210" height="110" />
    </ContentLoader>
  );

  function renderBestSellers() {
    return (
      <View style={{ marginBottom: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
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
          >
            Cursos Disponibles
          </Text>
        </View>
        {loading ? (
          <>
            <FlatList
              data={arrayFalso}
              horizontal={true}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      //width: "100%",
                      //width: 266,
                      backgroundColor: COLORS.white,
                      marginRight: 15,
                      borderRadius: 10,
                      //marginBottom: 15,
                      //borderRadius: 10,
                      flexDirection: "row",
                    }}
                  >
                    <MyLoaderCurso />
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{ paddingLeft: 20 }}
              showsHorizontalScrollIndicator={false}
            />
          </>
        ) : (
          <FlatList
            data={cursos}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  width: 266,
                  backgroundColor: COLORS.white,
                  marginRight: 15,
                  borderRadius: 10,
                }}
                onPress={() => {
                  navigation.navigate("CursoDetalle", {
                    curso: item,
                    usuario: JSON.parse(currentUser),
                    imagen: imagenes[index],
                  });
                }}
              >
                <Image
                  source={{
                    uri: imagenes[index],
                  }}
                  style={{
                    width: "100%",
                    height: 136,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 16,
                      textTransform: "capitalize",
                      color: COLORS.black,
                      marginBottom: 5,
                    }}
                  >
                    {item.titulo}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.Mulish_400Regular,
                      fontSize: 14,
                      lineHeight: 12 * 1.2,
                      color: COLORS.carrot,
                    }}
                  >
                    Objetivo : {item.objetivo}
                  </Text>
                  <View
                    style={{
                      width: "80%",
                      height: 1,
                      backgroundColor: "#E9E9E9",
                      marginVertical: 7,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 12,
                      color: COLORS.gray,
                      lineHeight: 14 * 1.2,
                    }}
                  >
                    {item.actividades.length === 1 ? (
                      <>Una actividad en este curso</>
                    ) : (
                      <>{item.actividades.length} actividades en este curso</>
                    )}
                    {"\n"}
                    <>Duraci&oacute;n {item.duracion} horas</>
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
          />
        )}
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
      <>
        <ItemPublicidad />
        {renderBestSellers()}
        <ItemNoticia />
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.black,
    marginTop: 20,
    marginBottom: 40,
  },
});
