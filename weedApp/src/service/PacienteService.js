import httpClient from "./HttpClient";
const prefix = "/pacientes";

export default class PacienteService {
  static async create(data) {
    return (await httpClient.post(`${prefix}`, data)).data;
  }

  static async update(data) {
    return (await httpClient.put(`${prefix}/${data.id}`, data)).data;
  }
}
