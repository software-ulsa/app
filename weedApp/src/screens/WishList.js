import { ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button, Header } from "../components";
import { AREA } from "../constants";
import MisNotas from "./notas/MisNotas";

export default function WishList() {
  const navigation = useNavigation();

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 30,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <Button
          title="Crear Una Nota"
          containerStyle={{ marginHorizontal: 20 }}
          onPress={() => navigation.navigate("NewCard")}
        />
        <MisNotas />
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Mis Notas" goBack={false} />
      {renderContent()}
    </SafeAreaView>
  );
}
