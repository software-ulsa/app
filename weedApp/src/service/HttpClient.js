import React from "react";
import { AuthContext } from "../navigation/AppNavigation";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const toke = null;
//await SecureStore.getItemAsync("auth-token");

const httpClient = axios.create({
  // baseURL: "http://192.168.0.4:8080",
  baseURL: "http://31.220.17.225", //server ip
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  async function (config) {
    const toke = await SecureStore.getItemAsync("auth-token");
    //console.log(toke);
    config.headers = {
      "Content-Type": "application/json",
    };
    if (toke) {
      config.headers = {
        "Content-Type": "application/json",
        "auth-token": toke,
      };
      //config.headers.authorization = toke;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        signOut();
      }
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        status: 500,
        message: "Error de conexión con el servidor.",
      });
    }
  }
);

const httpFormDataClient = axios.create({
  // baseURL: "http://192.168.0.4:8080",
  baseURL: "http://31.220.17.225", //server ip
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

httpFormDataClient.interceptors.request.use(
  async function (config) {
    const token = await SecureStore.getItemAsync("auth-token");
    config.headers = {
      "Content-Type": "multipart/form-data",
    };

    if (token) {
      config.headers = {
        "Content-Type": "multipart/form-data",
        "auth-token": token,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { httpFormDataClient };

export default httpClient;
