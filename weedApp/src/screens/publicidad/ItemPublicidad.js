import {
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import PublicidadService from "../../service/PublicidadService";
import { promo, SIZES, COLORS, products, FONTS } from "../../constants";

export default function ItemPublicidad() {
  const [publicidad, setPublicidad] = useState([]);
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
      const data = await PublicidadService.getAll();
      console.log(data);
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
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            overflow: "hidden",
          }}
        >
          <FlatList
            data={publicidad}
            // data={publicidad}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            renderItem={({ item, index, separators }) => (
              <View key={item.id} style={{ width: SIZES.width, height: 356 }}>
                <ImageBackground
                  source={{
                    uri: "https://images.mediotiempo.com/ssNNmDTL5h_6oN_HHPKtCABM4RM=/300x186/uploads/media/2022/03/30/rihla-balon-oficial-copa-mundial.jpg",
                  }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Text
                    style={{
                      flexDirection: "row",
                      height: "29%",
                      marginLeft: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute", //Here is the trick
                      bottom: 0,
                      fontSize: 30,
                      backgroundColor: "#3c34344a",
                      color: "#d2d7cadb",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {item?.nombre}
                  </Text>
                  <Text
                    style={{
                      flexDirection: "row",
                      height: "18%",
                      marginLeft: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute", //Here is the trick
                      bottom: 0,
                      fontSize: 18,
                      color: "#d2d7cadb",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {item?.descripcion}
                  </Text>
                  <Text
                    style={{
                      flexDirection: "row",
                      height: "10%",
                      marginLeft: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute", //Here is the trick
                      bottom: 0,
                      fontSize: 13,
                      color: "#d2d7cadb",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {item?.empresa}
                  </Text>
                </ImageBackground>
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
