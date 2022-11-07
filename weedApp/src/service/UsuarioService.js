import httpClient from "./HttpClient";
const prefix = "/users";

export default class UsuarioService{
    static async login(username, password){
        return (await httpClient.post(`${prefix}/login`,{username,password})).data;
    }

  static async create(user) {
    return (await httpClient.post(`${prefix}`, user)).data;
  }

}
