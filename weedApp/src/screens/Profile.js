import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import * as SecureStore from "expo-secure-store";
import { Header, ContainerComponent, ProfileCategory } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import {
  Edit,
  OrderCategory,
  PaymentCategory,
  AdressCategory,
  PromocodesCategory,
  FAQCategory,
  SignOutCategory,
} from "../svg";
import { AuthContext } from "../navigation/AppNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import CursoService from "../service/CursosService";
import ImagesService from "../service/ImagesService";
import Edit2 from "../svg/Edit2";

export default function Profile() {
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("");
  const [imagen, setImagen] = useState("");

  const { signOut } = React.useContext(AuthContext);

  React.useEffect(() => {
    llave();
  }, [imagen]);

  const llave = async () => {
    try {
      let result = await SecureStore.getItemAsync("user");
      //console.log(JSON.parse(result));
      if (result) {
        setUser(await JSON.parse(result));
        await traerFoto();
      }
    } catch (error) {
      console.log(error)
    }
  };

  const traerFoto = async () => {
    if (user?.imagen !== "" || user?.imagen !== null) {      
      let im = await ImagesService.getImage(user.imagen);
      // console.log(user?.imagen)
      // console.log(im);
      setImagen(await im);
    } else {
      let im =
        "https://thumbs.dreamstime.com/b/retrato-del-de-medio-cuerpo-doctor-placeholder-defecto-113622206.jpg";
      //photo.push(im);
      setImagen(im);
    }
  };

  const salir = () => {
    signOut();
    //navigation.navigate("OnBoarding");
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
            Estas seguro que quieres {"\n"} salir?
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
                salir();
                //navigation.navigate("SignIn");
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
                Si
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ContainerComponent containerStyle={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <ImageBackground
              source={{ uri: imagen }}
              style={{
                width: 80,
                height: 80,
                alignSelf: "center",
                marginBottom: 15,
              }}
              imageStyle={{ borderRadius: 40 }}
            >
              <View
                style={{
                  position: "absolute",
                  right: 3,
                  bottom: 3,
                }}
              >
                <Edit />
              </View>
            </ImageBackground>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_700Bold,
                fontSize: 16,
                textTransform: "capitalize",
                color: COLORS.black,
                marginBottom: 4,
                lineHeight: 16 * 1.2,
              }}
            >
              {user?.persona?.nombre ? user?.persona?.nombre + " " : ""}
              {user?.persona?.ape_paterno ? user?.persona?.ape_paterno + " " : ""}
              {user?.persona?.ape_materno ? user?.persona?.ape_materno + " " : ""}
            </Text>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_400Regular,
                fontSize: 14,
                color: COLORS.gray,
                lineHeight: 14 * 1.7,
              }}
            >
              {user?.persona?.correo ? user?.persona?.correo : ""}
            </Text>
          </TouchableOpacity>
        </ContainerComponent>
        <ContainerComponent>
          <ProfileCategory
            icon={<OrderCategory />}
            title="Mis cursos"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("OrderHistory")}
          />
          <ProfileCategory
            icon={<PaymentCategory />}
            title="Mi Perfil"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("EditProfile")}
          />
          <ProfileCategory
            icon={<AdressCategory />}
            title="Mi Historial"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("MyAddress")}
          />
          {/* <ProfileCategory
            icon={<PromocodesCategory />}
            title="My Promocodes"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("MyPromocodes")}
          /> */}
          <ProfileCategory
            icon={<FAQCategory />}
            title="FAQ"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("FAQ")}
          />
          <ProfileCategory
            icon={<SignOutCategory />}
            title="Cerrar sesión"
            containerStyle={{ marginBottom: 10 }}
            arrow={false}
            onPress={() => setShowModal(true)}
          />
        </ContainerComponent>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Header title="Mi Perfil" goBack={false} />
      {renderContent()}
      {<SignOutModal />}
    </SafeAreaView>
  );
}
