import {
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import PublicidadService from "../../service/PublicidadService";
import ImagesService from "../../service/ImagesService";
import { promo, SIZES, COLORS, products, FONTS } from "../../constants";
import LoadingView from "../LoadingView";

export default function ItemPublicidad() {
  const anunciate =
    "https://asap-public-bucket.s3.us-west-2.amazonaws.com/ANÚNCIATE.png";
  const staticItem = {
    imagen: anunciate,
    url_empresa:
      "https://www.lenovo.com/mx/es/laptops/thinkbook/thinkbook-s/Lenovo-ThinkBook-14s-IWL/p/88LG8TB1343",
  };
  const [imagenes, setImagenes] = useState([anunciate]);
  const [publicidad, setPublicidad] = useState([staticItem]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  function updateCurrentSlideIndex(e) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  }

  useEffect(() => {
    getPublicidad();
  }, []);

  const getPublicidad = async () => {
    try {
      const result = await PublicidadService.getAll();
      if (result.length === 0) {
        setImagenes([anunciate]);
        setPublicidad([staticItem]);
        return;
      }
      for (const record of result) {
        if (record.imagen) {
          try {
            const resultImage = await ImagesService.getImage(record?.imagen);
            setImagenes((imagenes) => [...imagenes, resultImage]);
          } catch (error) {
            setImagenes((imagenes) => [...imagenes, anunciate]);
          }
        } else {
          setImagenes((imagenes) => [...imagenes, anunciate]);
        }
      }
      setPublicidad(result);
    } catch (error) {
      console.log(error);
      setImagenes([anunciate]);
      setPublicidad([staticItem]);
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
          {publicidad.map((_, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlideIndex == index && {
                    width: 22,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <>
      <View>
        <View
          style={{
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3,
            overflow: "hidden",
          }}
        >
          <FlatList
            data={publicidad}
            keyExtractor={(item) => item.imagen.toString()}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            renderItem={({ item, index }) => (
              <View
                key={item.imagen}
                style={{
                  width: SIZES.width,
                  height: 369,
                }}
              >
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.url_empresa)}
                >
                  <ImageBackground
                    source={{
                      uri: imagenes[index],
                    }}
                    style={{ width: "100%", height: "100%" }}
                  ></ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        {renderDots()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.black,
    marginTop: 20,
    marginBottom: 40,
  },
});
