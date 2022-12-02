import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Sizes, styles, Colors, Fonts } from "./styles";
import MessageComponent from "./MessageComponent";
import io from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const { width } = Dimensions.get("screen");
import { Menu, MenuItem } from "react-native-material-menu";
const MessagesScreen = ({ navigation, route }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useRef(null);
  const [user, setUser] = useState();

  const { especialista } = route.params;

  const [imageProfile, setImageProfile] = useState(
    "https://thumbs.dreamstime.com/b/retrato-del-de-medio-cuerpo-doctor-placeholder-defecto-113622206.jpg"
  );

  const [state, setState] = useState({
    showOptions: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { showOptions } = state;

  const [showAttachmentSheet, setShowAttachmentSheet] = useState(false);

  useEffect(() => {
    getCurrentUser();
    socket.current = io("http://194.195.86.77:3001");

    socket.current.on("message", (mensaje) => {
      setChatMessages((chatMessages) => [...chatMessages, mensaje]);
    });
  }, []);

  const getCurrentUser = async () => {
    try {
      const data = await SecureStore.getItemAsync("user");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMenssage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    socket.current.emit("message", {
      message,
      user: JSON.parse(user)?.persona?.nombre,
      time: `${hour}: ${mins}`,
    });
    setMessage("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar backgroundColor={COLORS.goldenTransparent_01} /> */}
      <View style={{ flex: 1 }}>
        <View style={styles.headerWrapStyle}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={40}
              color={"#504c4c"}
              onPress={() => navigation.goBack()}
            />
            <Image
              source={{ uri: imageProfile }}
              style={{
                marginLeft: 10,
                width: 40.0,
                height: 40.0,
                borderRadius: 20.0,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              //onPress={() => navigation.push("ChatDetail", { item: item })}
              style={{ maxWidth: width / 1.0, marginLeft: 10 }}
            >
              <Text
                style={{
                  color: "#201c1c",
                  fontSize: 17,
                  fontFamily: "Mulish_600SemiBold",
                  overflow: "hidden",
                }}
              >
                {especialista.usuario?.persona?.nombre + " "}
                {especialista.usuario?.persona?.segundo_nombre
                  ? especialista.usuario?.persona?.segundo_nombre
                  : ""}{" "}
              </Text>
              <Text
                style={{
                  marginTop: 10 - 8.0,
                  color: "#201c1c",
                  fontSize: 14,
                  fontFamily: "Mulish_400Regular",
                }}
              >
                Online
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.messagingscreen}>
          <View
            style={[
              styles.messagingscreen,
              { paddingVertical: 15, paddingHorizontal: 10 },
            ]}
          >
            {chatMessages[0] ? (
              <FlatList
                data={chatMessages}
                renderItem={({ item }) => (
                  <MessageComponent
                    item={item}
                    user={JSON.parse(user)?.persona?.nombre}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            ) : null}
          </View>

          <View style={styles.messaginginputContainer}>
            <TextInput
              style={styles.messaginginput}
              onChangeText={(value) => setMessage(value)}
              value={message}
            />
            <Pressable
              style={styles.messagingbuttonContainer}
              onPress={sendMenssage}
            >
              <View>
                <Text style={{ color: "#f2f0f1", fontSize: 20 }}>Enviar</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;
