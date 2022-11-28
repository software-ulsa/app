import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Icon } from "react-native-elements";
import { Button, ContainerComponent, Header } from "../components";
import { AREA, COLORS, FONTS, SIZES } from "../constants";
import { ShippedSvg, DeliveredSvg, CanceledSvg } from "../svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import ConfettiCannon from "react-native-confetti-cannon";
import ActividadService from "../service/ActividadService";
import { showMessage } from "react-native-flash-message";
import RenderHtml from "react-native-render-html";
import WebView from "react-native-webview";
import ImagesService from "../service/ImagesService";

const webViewProps = {
  originWhitelist: "*",
};

export default function ActividadDetail() {
  const navigation = useNavigation();
  //const isFocused = useIsFocused();

  const route = useRoute();
  const { actividad, usuario, curso, id, error } = route.params;
  const [unit, setUnit] = useState(true);
  const inputEl = useRef("");
  const [bandera, setBandera] = useState(false);
  const regex = /<[^>]*>/gim;
  useEffect(() => {
    getImage();
  }, []);

  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const [shoot, setShoot] = useState(false);
  const [image, setImage] = useState(
    "https://i.gifer.com/origin/d3/d3f472b06590a25cb4372ff289d81711_w200.gif"
  );
  const controlRef = useRef();

  const getImage = async () => {
    try {
      if (!actividad?.url_media.includes("http")) {
        const data = await ImagesService.getImage(actividad?.url_media);
        setImage(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onStateChange = (state) => {
    if (state === "ended") {
      setPlaying(false);

      Alert.alert("video has finished playing!");
    }

    if (state !== "playing") {
      setPlaying(false);
    }
  };

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

  const seekBackAndForth = (control) => {
    console.log("currentTime");

    controlRef.current?.getCurrentTime().then((currentTime) => {
      control === "forward"
        ? controlRef.current?.seekTo(currentTime + 15, true)
        : controlRef.current?.seekTo(currentTime - 15, true);
    });
  };

  const muteVideo = () => setMute(!isMute);

  const ControlIcon = ({ name, onPress }) => (
    <Icon onPress={onPress} name={name} size={40} color="#fff" />
  );

  const completar = async () => {
    try {
      const actividad = ActividadService.completar(curso, usuario, id);
      setShoot(false);
      setTimeout(() => {
        setShoot(true);
      }, 500);
      //navigation.goBack();
      setBandera(true);
    } catch (error) {
      //console.log(error)
      showMessage({
        message: `Error intente nuevamente`,
        type: "danger",
      });
    }
  };

  function renderContent() {
    return (
      <>
        <View
          style={{
            backgroundColor: "#00ace6c2",
            height: "8%",
            display: "flex",
            justifyContent: "center",
            // margin: 7,
          }}
        >
          <Text
            style={{
              ...FONTS.Mulish_600SemiBold,
              color: COLORS.black,
              fontSize: 20,
              lineHeight: 16 * 1.7,
              marginBottom: 5,
              //marginLeft: 15,
              marginTop: 10,
              alignSelf: "center",
            }}
          >
            {actividad?.titulo}
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 5,
            //paddingVertical: 15,
            //marginTop: 20,
            paddingBottom: 30,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={{ marginTop: "1%" }}>
              <View style={{ margin: "2%" }}>
                <Text>{actividad?.descripcion.replace(regex, "")}</Text>
                {/* {item?.contenido.replace(regex, "").slice(0, 29)}... */}
              </View>

              <View style={{ marginTop: "1%" }}>
                {actividad?.url_media.includes("http") ? (
                  <>
                    {actividad?.url_media.includes("youtube.com") ? (
                      <View style={{ flex: 1 }}>
                        <WebView
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          scrollEnabled={false}
                          source={{
                            uri: `${actividad?.url_media}?controls=0&showinfo=0&wmode=transparent&rel=0&mode=opaque`,
                          }}
                          style={{
                            height: 400,
                            width: "100%",
                          }}
                          onError={(err) => {
                            console.log(err, "this is errr");
                          }}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(actividad?.url_media)}
                      >
                        <Image
                          source={{
                            uri: "https://img.icons8.com/clouds/500/google-docs.png",
                          }}
                          style={{
                            width: "90%",
                            height: 200,
                            //borderRadius: 10,
                            marginHorizontal: 10,
                            marginVertical: 10,
                            alignSelf: "center",
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <Image
                    source={{
                      uri: image,
                    }}
                    style={{
                      width: "90%",
                      height: 200,
                      //borderRadius: 10,
                      marginHorizontal: 10,
                      marginVertical: 10,
                      alignSelf: "center",
                    }}
                  />
                )}
              </View>
            </View>
          </View>

          <>
            {error.error !== "Debes inscribirte al curso primero." ? (
              actividad.completada || bandera ? (
                <View
                  style={{
                    height: 50,
                    backgroundColor: COLORS.carrot,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 15,
                    marginBottom: 70,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      textAlign: "center",
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 16,
                      textTransform: "uppercase",
                    }}
                  >
                    Ya has completado esta actividad
                  </Text>
                </View>
              ) : (
                <View style={{ marginBottom: 70 }}>
                  <Button
                    title={"Marcar como completada"}
                    containerStyle={{
                      backgroundColor: COLORS.green,
                      flexDirection: "row",
                      marginHorizontal: 15,
                    }}
                    icon={true}
                    onPress={completar}
                  ></Button>
                </View>
              )
            ) : (
              <></>
            )}
          </>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      {shoot ? (
        <ConfettiCannon
          count={250}
          origin={{ x: -10, y: 0 }}
          //autoStart={true}
          explosionSpeed={500}
          fadeOut={true}
        />
      ) : null}
      <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
        <Header
          title={`Actividad #${id}`}
          onPress={() => navigation.goBack()}
        />
        {renderContent()}
      </SafeAreaView>
    </>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
