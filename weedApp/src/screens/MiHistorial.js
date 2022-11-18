import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
  
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  
  import { Header } from "../components";
  import { AREA, COLORS, FONTS, orderHistory } from "../constants";
  import { ShippedSvg, DeliveredSvg, CanceledSvg } from "../svg";
  import SuscripcionService from "../service/SubsService";
  import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
  
  export default function MiHistorial() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user_id, user } = route.params;
  
    const [cursos, setCursos] = useState([]);
  
    useEffect(() => {
      llamarMisCurso();
    }, []);
  
    const llamarMisCurso = async () => {
      try {
        const sus = await SuscripcionService.getMySubs(user_id);
        if (sus) {
          setCursos(await sus);
          //console.log(sus);
        }
      } catch (error) {
        console.log(error);
      }
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
          {cursos.map((item, index) => {
              //console.log(item)
            return (
              <>
                {item.progreso != 100 ? (
                  <></>
                ) : (
                  <>
                    <View
                      key={index}
                      style={{
                        width: "100%",
                        height: 88,
                        backgroundColor: COLORS.white,
                        marginBottom: 10,
                        borderRadius: 10,
                        padding: 20,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ marginRight: 15 }}>
                        {
                          // item.status === "Shipped" ? (
                          //   <ShippedSvg />
                          // ) : item.status === "Delivered" ? (
                          //   <DeliveredSvg />
                          // ) : item.status === "Canceled" ? (
                          //   <CanceledSvg />
                          // ) : null https://unipython.com/wp-content/uploads/2019/09/unipython-curso-programacion-983x777.jpg
                        }
                        <Ionicons
                          name="md-checkmark-circle"
                          size={50}
                          color="green"
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            ...FONTS.Mulish_700Bold,
                            fontSize: 16,
                            marginBottom: 4,
                            color: COLORS.black,
                          }}
                        >
                          {item.curso.titulo}
                        </Text>
                        <Text
                          style={{
                            ...FONTS.Mulish_400Regular,
                            fontSize: 14,
                            color: COLORS.gray,
                          }}
                        >
                         Inicio: {item.fecha_inicio +"\nFin:"}
                         {item.fecha_fin ? item.fecha_fin : ""}
                        </Text>
                        
                      </View>
                      <View
                        style={{
                          width: 90,
                          height: 32,
                          backgroundColor: COLORS.green,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 16,
                        }}
                        
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.Mulish_400Regular,
                            fontSize: 14,
                          }}
                        >
                          Completado
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </>
            );
          })}
        </ScrollView>
      );
    }
  
    return (
      <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
        <Header title="Mis Cursos" onPress={() => navigation.goBack()} />
        {renderContent()}
      </SafeAreaView>
    );
  }