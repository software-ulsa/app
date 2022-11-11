import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES, AREA } from "../../constants";
import { Button } from "../../components";
import { ArrowFive, BackSvg, HeartTwoSvg, RatingSvg } from "../../svg";
import { Header } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import RenderHtml from "react-native-render-html";
import WebView from "react-native-webview";
import ImagesServices from "../../service/ImagesService";

const webViewProps = {
  originWhitelist: "*",
};

export default function DetalleNotas() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  const [imagen, setImagen] = useState(
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bc0c6b69321565.5b7d0cbe723b5.gif"
  );

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      if (data.imagen) {
        const result = await ImagesServices.getImage(data.imagen);
        setImagen(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <View key={0} style={[styles.dot]} />
        </View>
      </View>
    );
  }

  function renderSlide() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            zIndex: 1,
            paddingHorizontal: 20,
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            width: SIZES.width,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackSvg />
          </TouchableOpacity>
          <TouchableOpacity>
            <HeartTwoSvg />
          </TouchableOpacity>
        </View>

        <ImageBackground
          style={{ width: SIZES.width, height: "100%" }}
          source={{ uri: imagen }}
        ></ImageBackground>
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={{ backgroundColor: "#EFEDE6" }}>
        {renderDots()}
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
            backgroundColor: "#EFEDE6",
          }}
        />
        <View
          style={{
            paddingVertical: 30,
            paddingTop: 10,
            backgroundColor: "#EFEDE6",
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
              fontSize: 18,
              color: COLORS.black,
              marginBottom: 19,
            }}
          >
            {data.tema}
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_600SemiBold,
                fontSize: 13,
                color: COLORS.gray,
                marginBottom: 19,
              }}
            >
              {data.palabras_clave.map((record, index) => {
                return index + 1 == data.palabras_clave.length
                  ? `${record}`
                  : `${record} `;
              })}
            </Text>

            <RenderHtml
              contentWidth={SIZES.width}
              source={{ html: data.contenido }}
              // source={{ html: info }}
              WebView={WebView}
              defaultWebViewProps={webViewProps}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#EFEDE6" }}>
      {loading ? (
        <>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              // paddingHorizontal: 20,
              // paddingVertical: 25,
              backgroundColor: "#EFEDE6",
            }}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ height: "100%" }}>{MyLoader()}</View>
          </ScrollView>
        </>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              // paddingHorizontal: 20,
              // paddingVertical: 25,
              backgroundColor: "#EFEDE6",
            }}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ height: "55%" }}>{renderSlide()}</View>
            <View style={{ height: "45%" }}>{renderContent()}</View>
          </ScrollView>
        </>
      )}
    </View>
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
