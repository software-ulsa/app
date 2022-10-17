import httpClient from "./HttpClient";
const prefix = "/users";

export default class UsuarioService{
    static async login(correo, password){
        return (await httpClient.post(`${prefix}/login`,{correo,password})).data;
    }

  static async create(user) {
    return (await httpClient.post(`${prefix}`, user)).data;
  }

}
