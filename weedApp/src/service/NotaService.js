import httpClient from "./HttpClient";
const prefix = "/notas";

export default class NotasService {
  static async getAll() {
    return (await httpClient.get(`${prefix}`)).data;
  }
}
