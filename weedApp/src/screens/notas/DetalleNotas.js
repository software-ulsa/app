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
  </dl>
  
  
  <p>Deinde dolorem quem maximum? <mark>Stoici scilicet.</mark> An tu me de L. Quo tandem modo? Nunc agendum est subtilius. Tum mihi Piso: Quid ergo? <a href="http://loripsum.net/" target="_blank">An potest cupiditas finiri?</a> Hoc Hieronymus summum bonum esse dixit. </p>
  
  <pre>Omnis autem in quaerendo, quae via quadam et ratione
  habetur, oratio praescribere primum debet ut quibusdam in
  formulis ea res agetur, ut, inter quos disseritur, conveniat
  quid sit id, de quo disseratur.
  
  Inquit, respondet: Quia, nisi quod honestum est, nullum est
  aliud bonum! Non quaero iam verumne sit;
  </pre>
  
  
  <ul>
    <li>Sed vobis voluptatum perceptarum recordatio vitam beatam facit, et quidem corpore perceptarum.</li>
    <li>Quid igitur dubitamus in tota eius natura quaerere quid sit effectum?</li>
    <li>Non potes, nisi retexueris illa.</li>
    <li>Eorum enim omnium multa praetermittentium, dum eligant aliquid, quod sequantur, quasi curta sententia;</li>
    <li>Ut id aliis narrare gestiant?</li>
    <li>Et certamen honestum et disputatio splendida! omnis est enim de virtutis dignitate contentio.</li>
  </ul>
  
  
  <ol>
    <li>Ita fit cum gravior, tum etiam splendidior oratio.</li>
    <li>An ea, quae per vinitorem antea consequebatur, per se ipsa curabit?</li>
    <li>Sed tu istuc dixti bene Latine, parum plane.</li>
    <li>Multa sunt dicta ab antiquis de contemnendis ac despiciendis rebus humanis;</li>
    <li>Quid de Platone aut de Democrito loquar?</li>
  </ol>
  
  
  <h2>Rhetorice igitur, inquam, nos mavis quam dialectice disputare?</h2>
  
  <p><b>Minime vero istorum quidem, inquit.</b> Graece donan, Latine voluptatem vocant. Huius, Lyco, oratione locuples, rebus ipsis ielunior. Tanta vis admonitionis inest in locis; Quod cum dixissent, ille contra. Quid censes in Latino fore? </p>
  
  <blockquote cite="http://loripsum.net">
    Possumusne hic scire qualis sit, nisi contulerimus inter nos, cum finem bonorum dixerimus, quid finis, quid etiam sit ipsum bonum?
  </blockquote>
  `;

  // console.log(data)

  function renderContent() {
    return (
      <View style={{ backgroundColor: "#e0ecf4" }}>
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ResponsiveImage
            source={{
              uri: "https://media.istockphoto.com/id/174634635/es/foto/oaxaca.jpg?s=612x612&w=0&k=20&c=hrIKcKWf2zoHQ7hemQO71daUsH7heqJTXC5uTCfJuVQ=",
              // uri: imagen,
            }}
            initWidth={SIZES.width}
            initHeight={SIZES.height / 2}
          />
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
              // source={{ html: data.contenido }}
              source={{ html: dataHTML }}
              WebView={WebView}
              defaultWebViewProps={webViewProps}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
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
