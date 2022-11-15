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
import { useNavigation, useRoute } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Icon } from "react-native-elements";
import { ContainerComponent, Header } from "../components";
import { AREA, COLORS, FONTS, orderHistory } from "../constants";
import { ShippedSvg, DeliveredSvg, CanceledSvg } from "../svg";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ActividadDetail() {
  const navigation = useNavigation();

  const route = useRoute();
  const { actividad } = route.params;
  const [unit, setUnit] = useState(true);

  useEffect(() => {
    //console.log(actividad);
  }, []);

  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);

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

  function renderContent() {
    return (
      <>
        <View
          style={{
            backgroundColor: COLORS.golden,
            height: "8%",
            display: "flex",
            justifyContent: "center",
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
            paddingBottom:30
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
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
                alignSelf:'center'
              }}
            />
            <Text
              style={{
                ...FONTS.H6,
                color: COLORS.gray,
                fontSize: 12,
                lineHeight: 12 * 1.3,
                marginBottom: 50,
                marginLeft: 15,
                marginRight: 15,
                textAlign: "justify",
                marginTop: 15,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>
        </ScrollView>
      </>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title={actividad.titulo} onPress={() => navigation.goBack()} />
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
  container: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
