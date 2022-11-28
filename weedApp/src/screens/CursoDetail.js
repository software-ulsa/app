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
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import Modal from "react-native-modal";
import { ContainerComponent, Header } from "../components";
import { AREA, COLORS, FONTS, orderHistory, SIZES } from "../constants";
import { ShippedSvg, DeliveredSvg, CanceledSvg } from "../svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProgresoService from "../service/ProgresoService";
import { ProgressBar, MD3Colors } from "react-native-paper";
import SuscripcionService from "../service/SubsService";
import { showMessage } from "react-native-flash-message";

export default function CursoDetail() {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const route = useRoute();
  const { curso, usuario, imagen } = route.params;
  const [unit, setUnit] = useState(true);
  const [isDentro, setIsDentro] = useState(false);
  const [progress, setProgress] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inscrito, setInscrito] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // console.log(curso.id)
    // console.log(usuario.id)
    isFocused && progreso();
    progreso();
  }, [inscrito, isFocused]);

  const progreso = async () => {
    try {
      const res = await ProgresoService.getProgreso(usuario.id, curso.id);
      //console.log(res);
      if (res.id !== null) {
        setProgress(await res);
        setIsDentro(true);
        setError("");
      }
    } catch (error) {
      //console.log(error);
      setError(await error);
    }
  };

  const inscribirme = async () => {
    try {
      const subs = await SuscripcionService.suscribirme(curso.id, usuario.id);
      //console.log(subs)
      showMessage({
        message: `Haz sido inscrito al curso\nDisfrutalo!!!`,
        type: "success",
      });
      setShowModal(false);
      setInscrito(true);
    } catch (error) {
      showMessage({
        message: `Error al inscribirse\n intente más tarde`,
        type: "danger",
      });
    }
  };

  function SignOutModal() {
    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={setShowModal}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{ margin: 0 }}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View
          style={{
            width: SIZES.width - 60,
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 34,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_600SemiBold,
              fontSize: 20,
              marginBottom: 26,
            }}
          >
            ¿Estás segur@ que quieres {"\n"} inscribirte a {curso?.titulo}?
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 130,
                height: 40,
                backgroundColor: COLORS.white,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7.5,
                borderColor: COLORS.goldenTransparent_05,
                borderWidth: 1,
              }}
              onPress={() => setShowModal(false)}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  color: COLORS.red,
                  textTransform: "uppercase",
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 130,
                height: 40,
                backgroundColor: COLORS.golden,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7.5,
              }}
              onPress={() => {
                inscribirme();
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  textTransform: "uppercase",
                }}
              >
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function renderUnidades() {
    return (
      <>
        {isDentro ? (
          <>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 5,
                //paddingVertical: 25,
                //marginTop: 20,
              }}
              showsHorizontalScrollIndicator={false}
            >
              {progress?.curso?.actividades?.map((item, index) => {
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
                      navigation.navigate("DetalleActividad", {
                        actividad: item,
                        curso: curso.id,
                        usuario: usuario.id,
                        id: item.id,
                        error: error,
                      })
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
                      {item.completada ? (
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
          </>
        ) : (
          <>
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
                      navigation.navigate("DetalleActividad", {
                        actividad: item,
                        error: error,
                      })
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
                      <Ionicons
                        name="md-chevron-forward-circle"
                        size={35}
                        color="gray"
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}
      </>
    );
  }

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
              uri: `${
                imagen ==
                "https://www.edutelia.com/wp-content/uploads/2019/06/ver-curso.png"
                  ? "https://classic.exame.com/wp-content/uploads/2020/04/gettyimages-1168910967-e1587388035606.jpg?quality=70&strip=info&w=1024"
                  : imagen
              }`,
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
          {isDentro ? (
            <>
              <View
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: COLORS.gray,
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
                  Inscrito
                </Text>
              </View>
            </>
          ) : (
            <>
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
                onPress={() => setShowModal(true)}
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
            </>
          )}
        </View>
        <View
          style={{
            //backgroundColor: COLORS.goldenTransparent_04,
            height: "23%",
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

          {isDentro ? (
            <>
              <Text
                style={{
                  ...FONTS.H2,
                  color: COLORS.black,
                  fontSize: 11,
                  marginBottom: 10,
                  marginTop: 10,
                  marginLeft: 15,
                  textAlign: "justify",
                  // marginTop:30,
                }}
              >
                {progress?.progreso === 100 ? (
                  <>Curso Completo {progress?.progreso.toFixed(2)} %</>
                ) : (
                  <>Avance del curso: {progress?.progreso.toFixed(2)} %</>
                )}
              </Text>
              <ProgressBar
                progress={progress?.progreso / 100}
                color={COLORS.green}
                visible={true}
                style={{ height: 10, borderRadius: 10, marginHorizontal: 10 }}
              />
            </>
          ) : (
            <></>
          )}
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
          renderUnidades()
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
              Etiquetas
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
      <SignOutModal />
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
