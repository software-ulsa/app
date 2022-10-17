import { SafeAreaView, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { EyeOff, Check } from "../svg";
import DatePicker from "react-native-modern-datepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../navigation/AppNavigation";
import AnimatedLoader from "react-native-animated-loader";

export default function EditProfile() {
    const navigation = useNavigation();

    const [usu, setUsu] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [apePat, setApePat] = useState("");
    const [apeMat, setApeMat] = useState("");
    const [matricula, setMatricula] = useState("");
    const [telefono, setTelefono] = useState("");
    const [edad, setEdad] = useState("");
    const [sexo, setSexo] = useState("");
    const [email, setEmail] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [password, setPassword] = useState("");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Masculino", value: "Masculino" },
        { label: "Femenino", value: "Femenino" },
        { label: "No binario", value: "No binario" },
    ]);
    const [visible, setVisible] = useState(true);

    const [date, setDate] = useState(new Date());

    React.useEffect(() => {
        llave();
    }, []);

    const llave = async () => {
        let result = await SecureStore.getItemAsync("user");
        //console.log(result)
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
                        source={{ uri: usu.foto_perfil }}
                        style={{
                            width: 100,
                            height: 100,
                            alignSelf: "center",
                            borderRadius: 50,
                            marginBottom: 35,
                        }}
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
                        Nombre
                    </Text>
                    <InputField
                        value={usu.nombre ? usu.nombre : ""}
                        onChangeText={setName}
                        placeholder="Nombre"
                        containerStyle={{ marginBottom: 10 }}
                    //icon={<Check color={COLORS.gray} />}
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
                        Segundo Nombre
                    </Text>
                    <InputField
                        value={usu.segundo_nombre ? usu.segundo_nombre : ""}
                        onChangeText={setName}
                        placeholder="Segundo Nombre"
                        containerStyle={{ marginBottom: 10 }}
                    //icon={<Check color={COLORS.gray} />}
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
                        Primer Apellido
                    </Text>
                    <InputField
                        value={usu.ape_paterno ? usu.ape_paterno : ""}
                        onChangeText={setApePat}
                        placeholder="Apellido"
                        containerStyle={{ marginBottom: 10 }}
                    // icon={<Check color={COLORS.gray} />}
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
                        Segundo Apellido
                    </Text>
                    <InputField
                        value={usu.ape_materno ? usu.ape_materno : ""}
                        onChangeText={setApeMat}
                        placeholder="Apellido"
                        containerStyle={{ marginBottom: 10 }}
                    //icon={<Check color={COLORS.gray} />}
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
                        Sexo
                    </Text>

                    <DropDownPicker
                        style={{
                            width: "100%",
                            height: 50,
                            borderWidth: 1,
                            borderRadius: 25,
                            paddingHorizontal: 25,
                            borderColor: COLORS.goldenTransparent_03,

                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: COLORS.goldenTransparent_01,
                        }}
                        labelProps={{
                            style: { color: COLORS.gray },
                        }}
                        placeholder="Selecciona una opcion"
                        open={open}
                        value={usu.sexo ? usu.sexo : ""}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onChangeValue={(itemValue, itemIndex) => setSexo(itemValue)}
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
                        Telefono
                    </Text>

                    <InputField
                        value={usu.telefono ? usu.telefono : ""}
                        onChangeText={setTelefono}
                        placeholder="Telefono"
                        keyboardType="numeric"
                        containerStyle={{ marginBottom: 10 }}
                    //icon={<Check color={COLORS.gray} />}
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
                        Matricula
                    </Text>

                    <InputField
                        value={usu.matricula ? usu.matricula : ""}
                        onChangeText={setMatricula}
                        placeholder="Matricula"
                        keyboardType="numeric"
                        containerStyle={{ marginBottom: 10 }}
                    //icon={<Check color={COLORS.gray} />}
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
                        Correo
                    </Text>

                    <InputField
                        value={usu.correo ? usu.correo : ""}
                        placeholder="kristinwatson@mail.com"
                        containerStyle={{ marginBottom: 20 }}
                        icon={<Check color={COLORS.gray} />}
                        onChangeText={setEmail}
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
                        Nueva Contrase&ntilde;a
                    </Text>
                    <InputField
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!visiblePassword}
                        placeholder="*******"
                        containerStyle={{ marginBottom: 20 }}
                        icon={
                            <TouchableOpacity
                                onPress={() => {
                                    setVisiblePassword(!visiblePassword);
                                }}
                            >
                                <EyeOff />
                            </TouchableOpacity>
                        }
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
                        Confirmar Contrase&ntilde;a
                    </Text>
                    <InputField
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!visiblePassword}
                        placeholder="*******"
                        containerStyle={{ marginBottom: 20 }}
                        icon={
                            <TouchableOpacity
                                onPress={() => {
                                    setVisiblePassword(!visiblePassword);
                                }}
                            >
                                <EyeOff />
                            </TouchableOpacity>
                        }
                    />
                    <Button
                        title="Guardar Cambios"
                        onPress={() => navigation.navigate("MainLayout")}
                    />
                </ContainerComponent>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Editar Perfil" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
