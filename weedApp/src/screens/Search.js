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
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components";
import { COLORS, products, FONTS } from "../constants";
import { FilterSvg, SearchSvg, BagSvg, HeartSvg } from "../svg";
import CursoService from "../service/CursosService";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import NotasFilter from "./notas/NotasFilter";
import ImagesService from "../service/ImagesService";

export default function Search() {
  const navigation = useNavigation();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);
  const [select, setSelect] = useState(true);

  const [filtro, setFiltro] = useState("");
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    llamarCursos();
    setImagenes([]);
  }, [filtro]);

  const llamarCursos = async () => {
    try {
      let result = await SecureStore.getItemAsync("user");
      setCurrentUser(result);
      const cur = await CursoService.getCursoByFilter(filtro);
      setCursos(await cur);
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
            placeholder="Buscar por..."
            style={{ flex: 1 }}
            value={filtro}
            onChangeText={(e) => setFiltro(e)}
          />
        </View>
      </View>
    );
  }

  function renderContent() {
    return (
      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 50,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: "47.5%",
              marginBottom: 15,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              display: "flex",
              justifyContent: "space-evenly",
            }}
            onPress={() => {
              navigation.navigate("CursoDetalle", {
                curso: item,
                usuario: JSON.parse(currentUser),
                imagen: imagenes[index],
              });
            }}
          >
            <ImageBackground
              source={{
                uri: imagenes[index],
              }}
              style={{
                width: "100%",
                height: 128,
              }}
              imageStyle={{ borderRadius: 10 }}
            ></ImageBackground>
            <View
              style={{
                paddingHorizontal: 12,
                paddingBottom: 15,
                paddingTop: 12,
              }}
            >
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  textTransform: "capitalize",
                  lineHeight: 14 * 1.2,
                  color: COLORS.black,
                  marginBottom: 6,
                }}
              >
                {item.titulo}
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.Mulish_400Regular,
                  fontSize: 10,
                }}
              >
                Objetivo: {item.objetivo}
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#E9E9E9",
                  width: "75%",
                  marginVertical: 7,
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 11,
                  color: COLORS.carrot,
                }}
              >
                Duraci&oacute;n: {item.duracion} horas
              </Text>
              <TouchableOpacity>
                <Ionicons
                  name="md-chevron-forward-circle"
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row", height: "6%" }}>
        <TouchableOpacity
          style={select ? styles.select : styles.noSelect}
          onPress={() => setSelect(true)}
        >
          <Text style={select ? styles.textSelect : styles.noTextSelect}>
            Cursos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!select ? styles.select : styles.noSelect}
          onPress={() => setSelect(false)}
        >
          <Text style={!select ? styles.textSelect : styles.noTextSelect}>
            Notas
          </Text>
        </TouchableOpacity>
      </View>
      {select ? (
        <View>
          {renderSearch()}
          {renderContent()}
        </View>
      ) : (
        <NotasFilter />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  select: {
    backgroundColor: COLORS.transparent,
    width: "49%",
    justifyContent: "center",
    borderBottomColor: COLORS.golden,
    borderBottomWidth: 1,
  },
  noSelect: {
    // backgroundColor: COLORS.goldenTransparent_01,
    width: "49%",
    justifyContent: "center",
  },
  textSelect: {
    ...FONTS.H1,
    color: COLORS.gray,
    fontSize: 16,
    alignSelf: "center",
    color: COLORS.golden,
  },
  noTextSelect: {
    ...FONTS.H1,
    color: COLORS.gray,
    fontSize: 16,
    alignSelf: "center",
  },
});
