import httpClient from "./HttpClient.js";

const prefix = '/users';

export default class UsuarioService{
    static async login(correo, password){
        return (await httpClient.post(`${prefix}/login`,{correo,password})).data;
    }

}