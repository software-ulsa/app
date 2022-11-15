import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ContainerComponent, Header } from "../components";
import { AREA, COLORS, FONTS, orderHistory } from "../constants";
import { ShippedSvg, DeliveredSvg, CanceledSvg } from "../svg";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CursoDetail() {
  const navigation = useNavigation();

  const route = useRoute();
  const { curso } = route.params;
  const [unit, setUnit] = useState(true);

  useEffect(() => {
    //console.log(curso);
  }, []);

  function renderContent() {
    return (
      <>
        <View
          style={{
            backgroundColor: COLORS.golden,
            height: "8%",
            display: "flex",
          }}
        >
          <Image
            source={{
              uri: "https://classic.exame.com/wp-content/uploads/2020/04/gettyimages-1168910967-e1587388035606.jpg?quality=70&strip=info&w=1024",
            }}
            style={{
              width: 75,
              height: 75,
              alignSelf: "flex-start",
              borderRadius: 50,
              marginLeft: 20,
              marginTop: 10,
            }}
          />
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              backgroundColor: COLORS.green,
              borderRadius: 30,
              height: 25,
              width: 90,
              justifyContent: "center",
              marginRight: 25,
              marginTop: -65,
            }}
          >
            <Text
              style={{
                ...FONTS.Mulish_600SemiBold,
                alignSelf: "center",
                color: COLORS.white,
              }}
            >
              Inscribirme
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            //backgroundColor: COLORS.goldenTransparent_04,
            height: "20%",
            display: "flex",
          }}
        >
          <Text
            style={{
              ...FONTS.Mulish_600SemiBold,
              color: COLORS.black,
              fontSize: 20,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
              marginLeft: 15,
              marginTop: 30,
            }}
          >
            {curso?.titulo}
          </Text>
          <Text
            style={{
              ...FONTS.P,
              color: COLORS.gray,
              fontSize: 12,
              lineHeight: 16 * 1.3,
              marginBottom: 5,
              marginLeft: 15,
              marginRight: 15,
              textAlign: "justify",
              // marginTop:30,
            }}
          >
            {curso?.descripcion}
          </Text>
        </View>
        <View style={{ flexDirection: "row", height: "6%" }}>
          <TouchableOpacity
            style={unit ? styles.select : styles.noSelect}
            onPress={() => setUnit(true)}
          >
            <Text style={unit ? styles.textSelect : styles.noTextSelect}>
              UNIDADES
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!unit ? styles.select : styles.noSelect}
            onPress={() => setUnit(false)}
          >
            <Text style={!unit ? styles.textSelect : styles.noTextSelect}>
              DETALLES
            </Text>
          </TouchableOpacity>
        </View>
        {unit ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 5,
              //paddingVertical: 25,
              //marginTop: 20,
            }}
            showsHorizontalScrollIndicator={false}
          >
            {curso?.actividades?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: "100%",
                    height: 80,
                    backgroundColor: COLORS.white,
                    //marginBottom: 10,
                    borderRadius: 5,
                    padding: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("DetalleActividad", { actividad: item })
                  }
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        ...FONTS.Mulish_700Bold,
                        fontSize: 12,
                        marginBottom: 4,
                        marginRight: 5,
                        color: COLORS.black,
                        //lineHeight: 16 * 1,
                      }}
                    >
                      {item?.titulo}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.Mulish_400Regular,
                        fontSize: 10,
                        marginTop: 5,
                        color: COLORS.gray,
                      }}
                    >
                      + 50 puntos
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      //backgroundColor: COLORS.golden,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20,
                      marginRight: 10,
                    }}
                  >
                    {item.id === 1 ? (
                      <Ionicons
                        name="md-checkmark-circle"
                        size={35}
                        color="green"
                      />
                    ) : (
                      <Ionicons
                        name="md-chevron-forward-circle"
                        size={35}
                        color="gray"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <ContainerComponent>
            <Text
              style={{
                ...FONTS.Mulish_700Bold,
                color: COLORS.black,
                fontSize: 16,
                //lineHeight: 16 * 1.7,
                marginBottom: 5,
                marginLeft: 15,
                marginTop: -5,
              }}
            >
              Objetivo
            </Text>
            <Text
              style={{
                ...FONTS.P,
                color: COLORS.gray,
                fontSize: 11,
                lineHeight: 16 * 1.3,
                marginBottom: 5,
                marginLeft: 15,
                marginRight: 15,
                textAlign: "justify",
                // marginTop:30,
              }}
            >
              {curso?.objetivo}
            </Text>

            <Text
              style={{
                ...FONTS.Mulish_700Bold,
                color: COLORS.black,
                fontSize: 16,
                //lineHeight: 16 * 1.7,
                marginBottom: 5,
                marginLeft: 15,
                marginTop: 10,
              }}
            >
              Palabras Clave
            </Text>

            {curso?.palabras_clave?.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    color: COLORS.gray,
                    fontSize: 11,
                    lineHeight: 16 * 1.1,
                    marginLeft: 15,
                    marginRight: 15,
                    textAlign: "justify",
                    // marginTop:30,
                  }}
                >
                  {item}
                </Text>
              );
            })}
          </ContainerComponent>
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header //title="Curso Detalle"
        onPress={() => navigation.goBack()}
      />
      {renderContent()}
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
    fontSize: 12,
    alignSelf: "center",
    color: COLORS.golden,
  },
  noTextSelect: {
    ...FONTS.H1,
    color: COLORS.gray,
    fontSize: 12,
    alignSelf: "center",
  },
});
