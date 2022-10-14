import React from 'react';
import { AuthContext } from '../navigation/AppNavigation';
import axios from 'axios';


const httpClient = axios.create({
    baseURL: "https://juresca-api.com",
    headers: {
        "Content-Type": "application/json",
    },
});

httpClient.interceptors.request.use(
    function (config) {
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
    baseURL: "https://juresca-api.com",
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