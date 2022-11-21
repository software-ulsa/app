import httpClient from "./HttpClient";
const prefix = "/carreras";

export default class CarreraService {
  static async getAll() {
    return (await httpClient.get(`${prefix}`)).data;
  }
}
