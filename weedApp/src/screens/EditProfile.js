import { SafeAreaView, Image } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS } from "../constants";
import { EditTwo } from "../svg";
import { AuthContext } from "../navigation/AppNavigation";

export default function EditProfile() {
    const navigation = useNavigation();

    

    function renderContent() {
        const {usu} = React.useContext(AuthContext);
        
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
                        source={{uri: usu.foto_perfil}}
                        style={{
                            width: 60,
                            height: 60,
                            alignSelf: "center",
                            borderRadius: 30,
                            marginBottom: 35,
                        }}
                    />
                    <InputField
                        value={usu.nombre}
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        value={usu.correo}
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        value={usu.telefono}
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        value={usu.matricula}
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
