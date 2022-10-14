import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Check, EyeOff, RememberSvg } from "../svg";
import UsuarioService from "../service/UsuarioService";
import { AuthContext } from "../navigation/AppNavigation";



const  SignIn = ()  =>{
    const navigation = useNavigation();
    const [remember, setRemember] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = React.useContext(AuthContext);

    const iniciarSesion = async () => {
        try {
            const data = await UsuarioService.login(email, password);
            console.log(data);
            signIn(data.token);
            navigation.navigate('MainLayout');
        } catch (error) {
            console.log(error);
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
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.H1,
                            color: COLORS.black,
                            marginBottom: 14,
                            lineHeight: 32 * 1.2,
                            textTransform: "capitalize",
                        }}
                    >
                        Bienvenido!
                    </Text>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Mulish_400Regular,
                            color: COLORS.gray,
                            fontSize: 16,
                            lineHeight: 16 * 1.7,
                            marginBottom: 30,
                        }}
                    >
                        Ingresa para continuar
                    </Text>
                    <Text
                        style={{

                            ...FONTS.Mulish_400Regular,
                            color: COLORS.gray,
                            fontSize: 16,
                            lineHeight: 16 * 1.7,
                            marginBottom: 5,
                        }}
                    >
                        Correo
                    </Text>
                    <InputField
                        placeholder="johndoe@mail.com"
                        value={email}
                        onChangeText={setEmail}
                        containerStyle={{ marginBottom: 10 }}
                        icon={<Check color={COLORS.gray} />}
                        keyboardType="email-address"
                    />
                    <Text
                        style={{
                            ...FONTS.Mulish_400Regular,
                            color: COLORS.gray,
                            fontSize: 16,
                            lineHeight: 16 * 1.7,
                            marginBottom: 5,
                        }}
                    >
                        Contrase&ntilde;a
                    </Text>
                    <InputField
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!visiblePassword}
                        placeholder="*******"
                        containerStyle={{ marginBottom: 20 }}
                        icon={
                            <TouchableOpacity onPress={() => {
                                setVisiblePassword(!visiblePassword)
                            }}>
                                <EyeOff />
                            </TouchableOpacity>
                        }
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 30,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            onPress={() => setRemember(!remember)}
                        >
                            <View
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderWidth: 2,
                                    borderRadius: 5,
                                    borderColor: COLORS.goldenTransparent_05,
                                    marginRight: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {remember && <RememberSvg />}
                            </View>

                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 16,
                                    color: COLORS.gray,
                                    lineHeight: 16 * 1.7,
                                }}
                            >
                                Recordar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("ForgotPassword")
                            }
                        >
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 16,
                                    color: COLORS.black,
                                    lineHeight: 16 * 1.7,
                                }}
                            >
                                Olvide mi contrase&ntilde;a?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        title="Iniciar sesi&oacute;n"
                        onPress={iniciarSesion}
                    />
                </ContainerComponent>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "flex-end",
                        flex: 1,
                        marginBottom: 13,
                        flexDirection: "row",
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            color: COLORS.gray,
                        }}
                    >
                        No tengo cuenta?{" "}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_400Regular,
                                fontSize: 16,
                                color: COLORS.black,
                            }}
                        >
                            Registrarme.
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Sign In" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}

export default SignIn;