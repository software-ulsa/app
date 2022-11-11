import httpClient from "./HttpClient";
const prefix = "/notas";

export default class NotasService {
  static async getAll() {
    return (await httpClient.get(`${prefix}`)).data;
  }

  static async getNotasByUser(id) {
    return (await httpClient.get(`${prefix}`)).data;
  }
}
