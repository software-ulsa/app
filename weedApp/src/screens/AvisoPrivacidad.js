import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Briefcase } from "../svg";

export default function AvisoPrivacidad() {
  const navigation = useNavigation();

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ContainerComponent>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.H2,
              color: COLORS.black,
              lineHeight: 22 * 1.2,
              marginBottom: 14,
            }}
          >
            Condiciones del servicio
          </Text>
          <Text
            style={{
              textAlign: "justify",
              ...FONTS.Mulish_400Regular,
              fontSize: 16,
              color: COLORS.gray,
              paddingHorizontal: 20,
              lineHeight: 16 * 1.7,
              marginBottom: 30,
            }}
          >
            Software4All desarrolla tecnologías y servicios que permiten que las
            personas se conecten, creen comunidades y hagan crecer su salud
            mental. Estas Condiciones rigen el uso que haces de ASAP,
            Asap-Messenger y los demás productos, funciones, apps, servicios,
            tecnologías y software que ofrecemos (los Productos de Software4All
            o Productos), excepto cuando indiquemos expresamente que se aplican
            otras condiciones (y no estas). Software4All Platforms, Inc. te
            proporciona estos Productos. No cobramos por el uso de Asap ni de
            los otros productos y servicios que abarcan estas Condiciones, a
            menos que se especifique lo contrario. Por el contrario, los
            negocios, las organizaciones y otras personas nos pagan para que te
            mostremos anuncios de sus productos y servicios. Al usar nuestros
            Productos, aceptas que podemos mostrarte anuncios que consideremos
            que pueden resultar relevantes para ti y tus intereses. Usamos tus
            datos personales como ayuda para determinar qué anuncios
            personalizados mostrarte. No vendemos tus datos personales a los
            anunciantes ni compartimos información que te identifique
            directamente (como tu nombre, dirección de correo electrónico u otra
            información de contacto) con los anunciantes, a menos que nos des tu
            permiso expreso. Por el contrario, los anunciantes pueden
            proporcionarnos datos como el tipo de público que quieren que vea
            sus anuncios, y nosotros mostramos esos anuncios a las personas que
            pueden estar interesadas en ellos. Proporcionamos a los anunciantes
            informes sobre el rendimiento de sus anuncios para ayudarlos a
            entender cómo las personas interactúan con su contenido. Consulta la
            sección 2 a continuación para obtener más información sobre cómo
            funciona la publicidad personalizada en los Productos de
            Software4All conforme a estas condiciones.
          </Text>
        </ContainerComponent>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView
      style={{ ...AREA.AndroidSafeArea, paddingTop: getStatusBarHeight() }}
    >
      <Header
        title="Aviso de privacidad"
        goBack={true}
        onPress={() => navigation.goBack()}
      />
      {renderContent()}
    </SafeAreaView>
  );
}
