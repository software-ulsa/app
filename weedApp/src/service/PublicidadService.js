import httpClient from "./HttpClient";
const prefix = "/publicidad";

export default class PublicidadService {
  static async getAll() {
    return (await httpClient.get(`${prefix}`)).data;
  }
}
