import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES, AREA } from "../../constants";
import { Button } from "../../components";
import { ArrowFive, BackSvg, HeartTwoSvg, RatingSvg } from "../../svg";
import { Header } from "../../components";
import { getStatusBarHeight } from "react-native-status-bar-height";

// import { Header } from "@react-navigation/stack";
// import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import RenderHtml from "react-native-render-html";
import WebView from "react-native-webview";
import ImagesServices from "../../service/ImagesService";
import ResponsiveImage from "react-native-responsive-image";

const webViewProps = {
  originWhitelist: "*",
};

export default function DetalleNotas() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;
  const { imagen } = route.params;

  function renderContent() {
    return (
      <View style={{ backgroundColor: "#e0ecf4" }}>
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginVertical: 15,
          }}
        >
          {!imagen ? (
            <></>
          ) : (
            <ResponsiveImage
              source={{ uri: imagen }}
              initWidth={SIZES.width}
              initHeight={SIZES.height / 2}
            />
          )}
        </View>

        <View
          style={{
            width: SIZES.width,
            height: 15,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            position: "absolute",
            top: -15,
            backgroundColor: COLORS.white,
            zIndex: 9,
            // backgroundColor: "#e0ecf4",
          }}
        />

        <View
          style={{
            paddingVertical: 30,
            paddingTop: 10,
            backgroundColor: "#e0ecf4",
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              ...FONTS.Mulish_700Bold,
              fontSize: 22,
              textAlign: "center",
              textTransform: "capitalize",
              lineHeight: 22 * 1.2,
              marginBottom: 9,
              color: COLORS.black,
            }}
          >
            {data.titulo}
          </Text>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_600SemiBold,
              fontSize: 15,
              color: COLORS.black,
            }}
          >
            Tema: {data.tema}
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_600SemiBold,
                fontSize: 13,
                color: COLORS.gray,
              }}
            >
              Palabras clave:{" "}
              {data.palabras_clave.map((record, index) => {
                return index + 1 == data.palabras_clave.length
                  ? `${record}`
                  : `${record}, `;
              })}
            </Text>

            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_600SemiBold,
                fontSize: 13,
                color: COLORS.gray,
              }}
            >
              Autor: {data?.usuario?.persona?.nombre.split(" ")[0]}
            </Text>

            <RenderHtml
              contentWidth={SIZES.width}
              source={{ html: data.contenido }}
              WebView={WebView}
              defaultWebViewProps={webViewProps}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ ...AREA.AndroidSafeArea, paddingTop: getStatusBarHeight() }}
    >
      <Header
        title={data.titulo}
        goBack={true}
        onPress={() => navigation.goBack()}
      />

      <View style={{ backgroundColor: "#e0ecf4" }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: "#EFEDA6",
            // flex: 1,
          }}
          showsHorizontalScrollIndicator={true}
        >
          {/* <View style={{ height: "55%" }}>{renderSlide()}</View> */}
          <View style={{ height: "100%" }}>{renderContent()}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 2,
    top: -50,
  },
});

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={476}
    height={460}
    viewBox="0 0 476 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="16" y="8" rx="2" ry="2" width="353" height="224" />
    <Rect x="59" y="246" rx="0" ry="0" width="270" height="21" />
    <Rect x="95" y="277" rx="0" ry="0" width="195" height="13" />
    <Rect x="13" y="299" rx="0" ry="0" width="63" height="17" />
    <Rect x="84" y="300" rx="0" ry="0" width="91" height="15" />
    <Rect x="184" y="300" rx="0" ry="0" width="78" height="14" />
    <Rect x="270" y="300" rx="0" ry="0" width="60" height="16" />
    <Rect x="338" y="301" rx="0" ry="0" width="29" height="16" />
    <Rect x="11" y="323" rx="0" ry="0" width="40" height="17" />
    <Rect x="58" y="323" rx="0" ry="0" width="91" height="15" />
    <Rect x="155" y="323" rx="0" ry="0" width="78" height="14" />
    <Rect x="237" y="322" rx="0" ry="0" width="60" height="16" />
    <Rect x="305" y="321" rx="0" ry="0" width="60" height="16" />
    <Rect x="13" y="343" rx="0" ry="0" width="63" height="17" />
    <Rect x="84" y="344" rx="0" ry="0" width="91" height="15" />
    <Rect x="184" y="344" rx="0" ry="0" width="78" height="14" />
    <Rect x="270" y="344" rx="0" ry="0" width="60" height="16" />
    <Rect x="338" y="345" rx="0" ry="0" width="29" height="16" />
    <Rect x="11" y="367" rx="0" ry="0" width="40" height="17" />
    <Rect x="58" y="367" rx="0" ry="0" width="91" height="15" />
    <Rect x="155" y="367" rx="0" ry="0" width="78" height="14" />
    <Rect x="237" y="366" rx="0" ry="0" width="60" height="16" />
    <Rect x="305" y="365" rx="0" ry="0" width="60" height="16" />
    <Rect x="12" y="387" rx="0" ry="0" width="63" height="17" />
    <Rect x="83" y="388" rx="0" ry="0" width="91" height="15" />
    <Rect x="183" y="388" rx="0" ry="0" width="78" height="14" />
    <Rect x="269" y="388" rx="0" ry="0" width="60" height="16" />
    <Rect x="337" y="389" rx="0" ry="0" width="29" height="16" />
    <Rect x="10" y="411" rx="0" ry="0" width="40" height="17" />
    <Rect x="57" y="411" rx="0" ry="0" width="91" height="15" />
    <Rect x="154" y="411" rx="0" ry="0" width="78" height="14" />
    <Rect x="236" y="410" rx="0" ry="0" width="60" height="16" />
    <Rect x="304" y="409" rx="0" ry="0" width="60" height="16" />
    <Rect x="12" y="431" rx="0" ry="0" width="63" height="17" />
    <Rect x="83" y="432" rx="0" ry="0" width="91" height="15" />
    <Rect x="183" y="432" rx="0" ry="0" width="78" height="14" />
    <Rect x="269" y="432" rx="0" ry="0" width="60" height="16" />
    <Rect x="337" y="433" rx="0" ry="0" width="29" height="16" />
    <Rect x="10" y="455" rx="0" ry="0" width="40" height="17" />
    <Rect x="57" y="455" rx="0" ry="0" width="91" height="15" />
    <Rect x="154" y="455" rx="0" ry="0" width="78" height="14" />
    <Rect x="236" y="454" rx="0" ry="0" width="60" height="16" />
    <Rect x="304" y="453" rx="0" ry="0" width="60" height="16" />
  </ContentLoader>
);
