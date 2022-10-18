import React from 'react';
import { AuthContext } from '../navigation/AppNavigation';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const toke = null;
//await SecureStore.getItemAsync("auth-token");

const httpClient = axios.create({
    baseURL: "http://175.1.48.166:8080",
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
                "auth-token": toke
            };
            //config.headers.authorization = toke;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
)

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
            })
        }
    }
);


const httpFormDataClient = axios.create({
    baseURL: "http://175.1.48.166:8080",
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

httpFormDataClient.interceptors.request.use(
    function (config) {
        config.headers = {
            "Content-Type": "multipart/form-data",
        };

        if (toke) config.headers.authorization = toke;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export { httpFormDataClient };

export default httpClient;
