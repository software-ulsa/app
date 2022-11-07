import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import * as SecureStore from "expo-secure-store";
import {
  OnBoarding,
  SignIn,
  SignUp,
  ForgotPassword,
  AccountCreated,
  VerifyPhoneNumber,
  ConfirmationCode,
  NewPassword,
  RessetPasswordNotice,
  MainLayout,
  EditProfile,
  OrderSuccessful,
  OrderFailed,
  CartIsEmpty,
  Order,
  Checkout,
  ShippingDetails,
  PaymentMethod,
  OrderHistory,
  PaymentMethodCheckout,
  MyAddress,
  FAQ,
  MyPromocodes,
  Filter,
  ProductDetails,
  SelectSize,
  SelectColor,
  Reviews,
  TrackYourOrder,
  NewAddress,
  NewCard,
  EspecialistaDetails,
  AvisoPrivacidad,
  DetalleNotas
} from "../screens";
import { StatusBar } from "expo-status-bar";
import MessagesScreen from "../chat/MessageScreen";

const Stack = createStackNavigator();

export const AuthContext = React.createContext();

export default function Navigation() {
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          //console.log(action.userFound)
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            usuario: action.userFound,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            usuario: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      usuario: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (tokenFound, userFound) => {
        save("auth-token", tokenFound);
        //console.log(JSON.stringify(tokenFound))
        save("user", JSON.stringify(userFound));
        //console.log(JSON.stringify(userFound))
        dispatch({ type: "SIGN_IN", token: tokenFound, userFound: userFound });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      usu: state.usuario,
    }),
    []
  );

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerShown: false,
          }}
          initialRouteName="OnBoarding"
        >
          {state.userToken === null ? (
            <>
              <Stack.Screen name="OnBoarding" component={OnBoarding} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen
                name="RessetPasswordNotice"
                component={RessetPasswordNotice}
              />
              <Stack.Screen name="NewPassword" component={NewPassword} />
              <Stack.Screen
                name="ConfirmationCode"
                component={ConfirmationCode}
              />

              <Stack.Screen name="AccountCreated" component={AccountCreated} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen
                name="AvisoPrivacidad"
                component={AvisoPrivacidad}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="MainLayout" component={MainLayout} />
              <Stack.Screen name="OrderHistory" component={OrderHistory} />
              <Stack.Screen name="NewCard" component={NewCard} />
              <Stack.Screen name="MyAddress" component={MyAddress} />
              <Stack.Screen name="NewAddress" component={NewAddress} />
              <Stack.Screen name="SelectSize" component={SelectSize} />
              <Stack.Screen name="MyPromocodes" component={MyPromocodes} />
              <Stack.Screen name="SelectColor" component={SelectColor} />
              <Stack.Screen name="TrackYourOrder" component={TrackYourOrder} />
              <Stack.Screen name="FAQ" component={FAQ} />
              <Stack.Screen name="Reviews" component={Reviews} />
              <Stack.Screen name="ProductDetails" component={ProductDetails} />
              <Stack.Screen
                name="EspecialistaDetails"
                component={EspecialistaDetails}
              />
              <Stack.Screen name="ChatEspecialista" component={MessagesScreen} />
              <Stack.Screen
                name="PaymentMethodCheckout"
                component={PaymentMethodCheckout}
              />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen
                name="ShippingDetails"
                component={ShippingDetails}
              />
              <Stack.Screen name="Order" component={Order} />
              <Stack.Screen name="CartIsEmpty" component={CartIsEmpty} />
              <Stack.Screen name="Filter" component={Filter} />
              <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="OrderFailed" component={OrderFailed} />

              <Stack.Screen
                name="OrderSuccessful"
                component={OrderSuccessful}
              />
              <Stack.Screen
                name="ConfirmationCode"
                component={ConfirmationCode}
              />
              <Stack.Screen name="AccountCreated" component={AccountCreated} />
              <Stack.Screen name="DetalleNotas" component={DetalleNotas} />
            </>
          )}
        </Stack.Navigator>
        <FlashMessage position="top" />
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
