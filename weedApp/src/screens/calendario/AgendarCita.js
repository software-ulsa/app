import React, { useEffect } from "react";
import moment from "moment";
import Timetable from "react-native-calendar-timetable";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { COLORS, products, FONTS } from "../../constants";
import { Line } from "../../components";

export default function AgendarCita() {
  const [date] = React.useState(new Date());
  const [from] = React.useState(moment().subtract(3, "days").toDate());
  const [till] = React.useState(moment().add(3, "days").toISOString());
  const range = { from, till };
  const [select, setSelect] = React.useState(true);
  const [items] = React.useState([
    {
      title: "Esta ocupado, no lo chinges",
      startDate: moment().subtract(1, "hour").toDate(),
      endDate: moment().add(0, "hour").toDate(),
    },
  ]);

  useEffect(() => {}, []);

  return (
    <View style={{ backgroundColor: "#E1F8FF", width: "100%", height: "100%" }}>
      <View
        style={{
          flex: 1,
          margin: 15,
          marginTop: "10%",
          backgroundColor: "#E1F8FF",
        }}
      >
        <View style={{ height: "60%" }}>
          <ScrollView>
            <Timetable
              // these two are required
              items={items}
              cardComponent={MyItemCard}
              // provide only one of these if you need to
              date={date} // optional
              range={range} // optional
              // style={{backgroundColor: "#E1F8FF"}}
            />
          </ScrollView>
        </View>
        <View>
          <View style={{ flexDirection: "row", marginTop: "3%" }}>
            <TouchableOpacity
              style={select ? styles.select : styles.noSelect}
              onPress={() => setSelect(true)}
            >
              <Text style={select ? styles.textSelect : styles.noTextSelect}>
                Proximas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={!select ? styles.select : styles.noSelect}
              onPress={() => setSelect(false)}
            >
              <Text style={!select ? styles.textSelect : styles.noTextSelect}>
                Pasadas
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // paddingHorizontal: 20,
            paddingTop: 25,
            paddingBottom: 40,
          }}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: "2%" }}
        >
          {select ? (
            <View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 135,
                  backgroundColor: COLORS.white,
                  marginBottom: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 17,
                      // textTransform: "capitalize",
                      marginBottom: 6,
                    }}
                  >
                    Fecha: Lunes 30 de diciembre
                  </Text>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.Mulish_400Regular,
                      fontSize: 14,
                    }}
                  >
                    Tómate un tiempo para pensar realmente acerca de las cosas
                    que quieres hablar y acerca de las razón para iniciar una
                    terapia.
                  </Text>
                  <Line />
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      color: COLORS.lightGray,
                    }}
                  >
                    Recomendación: Llegar 15 minutos antes
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 135,
                  backgroundColor: COLORS.white,
                  marginBottom: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 17,
                      // textTransform: "capitalize",
                      marginBottom: 6,
                    }}
                  >
                    Fecha: Viernes 24 de diciembre
                  </Text>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.Mulish_400Regular,
                      fontSize: 14,
                    }}
                  >
                    Tómate un tiempo para pensar realmente acerca de las cosas
                    que quieres hablar y acerca de las razón para iniciar una
                    terapia.
                  </Text>
                  <Line />
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      color: COLORS.lightGray,
                    }}
                  >
                    Recomendación: Llegar 15 minutos antes
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 135,
                  backgroundColor: COLORS.white,
                  marginBottom: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 17,
                      // textTransform: "capitalize",
                      marginBottom: 6,
                    }}
                  >
                    Fecha: Jueves 10 de enero
                  </Text>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.Mulish_400Regular,
                      fontSize: 14,
                    }}
                  >
                    Tómate un tiempo para pensar realmente acerca de las cosas
                    que quieres hablar y acerca de las razón para iniciar una
                    terapia.
                  </Text>
                  <Line />
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      color: COLORS.lightGray,
                    }}
                  >
                    Recomendación: Llegar 15 minutos antes
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 135,
                  backgroundColor: COLORS.white,
                  marginBottom: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 17,
                      // textTransform: "capitalize",
                      marginBottom: 6,
                    }}
                  >
                    Fecha: Lunes 30 de marzo
                  </Text>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.Mulish_400Regular,
                      fontSize: 14,
                    }}
                  >
                    Tómate un tiempo para pensar realmente acerca de las cosas
                    que quieres hablar y acerca de las razón para iniciar una
                    terapia.
                  </Text>
                  <Line />
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      color: COLORS.lightGray,
                    }}
                  >
                    Recomendación: Llegar 15 minutos antes
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 135,
                  backgroundColor: COLORS.white,
                  marginBottom: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 17,
                      // textTransform: "capitalize",
                      marginBottom: 6,
                    }}
                  >
                    Fecha: Viernes 24 de junio
                  </Text>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.Mulish_400Regular,
                      fontSize: 14,
                    }}
                  >
                    Tómate un tiempo para pensar realmente acerca de las cosas
                    que quieres hablar y acerca de las razón para iniciar una
                    terapia.
                  </Text>
                  <Line />
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      color: COLORS.lightGray,
                    }}
                  >
                    Recomendación: Llegar 15 minutos antes
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 135,
                  backgroundColor: COLORS.white,
                  marginBottom: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 17,
                      // textTransform: "capitalize",
                      marginBottom: 6,
                    }}
                  >
                    Fecha: Jueves 10 de agosto
                  </Text>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.Mulish_400Regular,
                      fontSize: 14,
                    }}
                  >
                    Tómate un tiempo para pensar realmente acerca de las cosas
                    que quieres hablar y acerca de las razón para iniciar una
                    terapia.
                  </Text>
                  <Line />
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      color: COLORS.lightGray,
                    }}
                  >
                    Recomendación: Llegar 15 minutos antes
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

function MyItemCard({ style, item, dayIndex, daysTotal }) {
  return (
    <View
      style={{
        ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
        backgroundColor: "#84D4EC",
        borderRadius: 10,
        elevation: 5,
      }}
    >
      <Text style={{ margin: 3, fontSize: 20, marginLeft: 10 }}>
        Consulta con otro paciente
      </Text>
      <Text style={{ margin: 3, fontSize: 15, marginLeft: 10 }}>
        La siguiente hora la tiene libre :)
      </Text>
    </View>
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
    fontSize: 17,
    alignSelf: "center",
    color: COLORS.golden,
  },
  noTextSelect: {
    ...FONTS.H1,
    color: COLORS.gray,
    fontSize: 17,
    alignSelf: "center",
  },
});
