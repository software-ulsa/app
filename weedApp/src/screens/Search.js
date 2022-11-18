import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components";
import { COLORS, products, FONTS } from "../constants";
import { FilterSvg, SearchSvg, BagSvg, HeartSvg } from "../svg";
import CursoService from "../service/CursosService";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export default function Search() {
  const navigation = useNavigation();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    llamarCursos();
  }, []);

  const llamarCursos = async () => {
    try {
      //setLoading(true);
      let result = await SecureStore.getItemAsync("user");
      setCurrentUser(result);
      const cur = await CursoService.getAll();
      setCursos(await cur);
      //console.log(cur);
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
          <TextInput placeholder="Buscar por..." style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}
            onPress={() => navigation.navigate("Filter")}
          >
            <FilterSvg />
          </TouchableOpacity>
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
            }}
            onPress={() => {
              navigation.navigate("CursoDetalle", {
                curso: item,
                usuario: JSON.parse(currentUser),
              });
            }}
          >
            <ImageBackground
              source={{
                uri: `https://mexicoamparame.s3.us-west-2.amazonaws.com/${item?.imagen}?AWSAccessKeyId=AKIAV5XFJVPABQZOHZR7&Expires=1668303522&Signature=ruvgxDL2mlvPOFgjqRkfhhR8YQk%3D`,
              }}
              style={{
                width: "100%",
                height: 128,
              }}
              imageStyle={{ borderRadius: 10 }}
            >
              <TouchableOpacity style={{ left: 12, top: 12 }}>
                <HeartSvg />
              </TouchableOpacity>
            </ImageBackground>
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
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 11,
                  color: COLORS.carrot,
                }}
              >
                Duraci&oacute;n: {item.duracion} horas
              </Text>
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 20,
                bottom: 12,
              }}
            >
              <Ionicons
                name="md-chevron-forward-circle"
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Header title="Cursos" goBack={false} />
      {renderSearch()}
      {renderContent()}
    </SafeAreaView>
  );
}
