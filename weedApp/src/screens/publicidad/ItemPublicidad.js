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
import { promo, SIZES, COLORS, products, FONTS } from "../../constants";

export default function ItemPublicidad() {
  const [publicidad, setPublicidad] = useState([
    {
      imagen: "https://i.postimg.cc/765hVySv/lenovomexico-26112022-0001.jpg",
      url: "https://www.lenovo.com/mx/es/laptops/thinkbook/thinkbook-s/Lenovo-ThinkBook-14s-IWL/p/88LG8TB1343",
    },
    {
      imagen: "https://i.postimg.cc/Kcg43xZB/usesammy-26112022-0001.jpg",
      url: "https://www.bbva.mx/",
    },
    {
      imagen:
        "https://i.postimg.cc/xdKt1WX2/casinocaliente6297-26112022-0001-1.jpg",
      url: "https://www.caliente.mx/",
    },
    {
      imagen:
        "https://i.postimg.cc/wvqcT3KX/benandfrank-mx-26112022-0001-1.jpg",
      url: "https://www.benandfrank.com/",
    },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  function updateCurrentSlideIndex(e) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  }

  // useEffect(() => {
  //   getPublicidad();
  // }, []);

  const getPublicidad = async () => {
    try {
      const data = await PublicidadService.getAll();
      setPublicidad(data);
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
            // data={publicidad}
            keyExtractor={(item) => item.imagen.toString()}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            renderItem={({ item, index, separators }) => (
              <View
                key={item.imagen}
                style={{
                  width: SIZES.width,
                  height: 369,
                  // , marginTop: "6%"
                }}
              >
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <ImageBackground
                    source={{
                      uri: item.imagen,
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
