import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
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

const webViewProps = {
  originWhitelist: "*",
};

export default function ActividadDetail() {
  const dataHTML = `<h1>Tecum optime, deinde etiam cum mediocri amico.</h1>

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quid possumus facere melius? <a href="http://loripsum.net/" target="_blank">Conferam avum tuum Drusum cum C.</a> Quis enim redargueret? Age, inquies, ista parva sunt. Duo Reges: constructio interrete. Vitae autem degendae ratio maxime quidem illis placuit quieta. </p>
  
  <dl>
    <dt><dfn>ALIO MODO.</dfn></dt>
    <dd>Istam voluptatem, inquit, Epicurus ignorat?</dd>
    <dt><dfn>Quid nunc honeste dicit?</dfn></dt>
    <dd>In his igitur partibus duabus nihil erat, quod Zeno commutare gestiret.</dd>
    <dt><dfn>Quare attende, quaeso.</dfn></dt>
    <dd>Et summatim quidem haec erant de corpore animoque dicenda, quibus quasi informatum est quid hominis natura postulet.</dd>
    <dt><dfn>Sullae consulatum?</dfn></dt>
    <dd>Equidem, sed audistine modo de Carneade?</dd>
  </dl>`;
  const navigation = useNavigation();
  //const isFocused = useIsFocused();

  const route = useRoute();
  const { actividad, usuario, curso, id, error } = route.params;
  const [unit, setUnit] = useState(true);
  const inputEl = useRef("");
  const [bandera, setBandera] = useState(false);

  useEffect(() => {
    // console.log(actividad);
    // console.log(usuario);
    // console.log(curso);
    // console.log(id);
    //isFocused && progreso()
  }, []);

  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const [shoot, setShoot] = useState(false);

  const controlRef = useRef();

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
            backgroundColor: COLORS.golden,
            height: "8%",
            display: "flex",
            justifyContent: "center",
            margin: 7
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
          <View
            style={{
              //backgroundColor: COLORS.goldenTransparent_04,
              height: "12%",
              display: "flex",
            }}
          >
            <Text
              style={{
                ...FONTS.H6,
                color: COLORS.gray,
                fontSize: 12,
                lineHeight: 12 * 1.3,
                marginBottom: 5,
                marginLeft: 15,
                marginRight: 15,
                textAlign: "justify",
                marginTop: 15,
              }}
            >
              {actividad?.descripcion}
            </Text>
          </View>
          <View style={styles.container}>
            <YoutubePlayer
              height={250}
              // ref={controlRef}
              // play={playing}
              // mute={isMute}
              videoId={actividad.url_media}
              //baseUrlOverride={actividad.url_media}
              onChangeState={onStateChange}
              webViewStyle={{ backgroundColor: COLORS.goldenTransparent_01 }}
            />
            {/* <View style={styles.controlContainer}>
            <ControlIcon
              onPress={() => seekBackAndForth("rewind")}
              name="skip-previous"
            />

            <ControlIcon
              onPress={togglePlaying}
              name={playing ? "pause" : "play-arrow"}
            />

            <ControlIcon
              onPress={() => seekBackAndForth("forward")}
              name="skip-next"
            />
          </View>
          <ControlIcon
            onPress={muteVideo}
            name={isMute ? "volume-up" : "volume-off"}
          /> */}

            <RenderHtml
              contentWidth={SIZES.width}
              // source={{ html: data.contenido }}
              source={{ html: dataHTML }}
              WebView={WebView}
              defaultWebViewProps={webViewProps}
            />
            <Image
              source={{
                uri: "https://www.magisnet.com/wp-content/uploads/2018/11/18-11-21Tecnologia-en-el-aula-1024x630.jpg",
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
            <RenderHtml
              contentWidth={SIZES.width}
              // source={{ html: data.contenido }}
              source={{ html: dataHTML }}
              WebView={WebView}
              defaultWebViewProps={webViewProps}
            />
          </View>
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
        <Header title={actividad.titulo} onPress={() => navigation.goBack()} />
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
