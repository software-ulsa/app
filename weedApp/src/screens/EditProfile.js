import { SafeAreaView, Image } from "react-native";
import React, {useState} from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS } from "../constants";
import { EditTwo } from "../svg";
import { AuthContext } from "../navigation/AppNavigation";

export default function EditProfile() {
    const navigation = useNavigation();

    const [usu, setUsu] = useState("");

    React.useEffect(() => {
        llave();
    }, []);

    const llave = async () => {
        let result = await SecureStore.getItemAsync("user");
        if (result) {
            setUsu(JSON.parse(result));
        }
    }


    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 25,
                }}
                showsHorizontalScrollIndicator={false}
            >
                <ContainerComponent>
                    <Image
                        source={{ uri: usu.foto_perfil ? usu.foto_perfil: "" }}
                        style={{
                            width: 60,
                            height: 60,
                            alignSelf: "center",
                            borderRadius: 30,
                            marginBottom: 35,
                        }}
                    />
                    <InputField
                        value={usu.nombre ? usu.nombre : ""}
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        value={usu.correo ? usu.correo : ""}
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        value={usu.telefono ? usu.telefono : ""}
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        value={usu.matricula ? usu.matricula : ""}
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 20 }}
                    />
                    <Button
                        title="SAVE changes"
                        onPress={() => navigation.navigate("MainLayout")}
                    />
                </ContainerComponent>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Edit Profile" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
