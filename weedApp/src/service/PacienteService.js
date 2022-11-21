import httpClient from "./HttpClient";
const prefix = "/pacientes";

export default class PacienteService {
  static async create(data) {
    return (await httpClient.post(`${prefix}`, data)).data;
  }
}
