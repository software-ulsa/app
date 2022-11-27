import httpClient from "./HttpClient";
const prefix = "/notas";

export default class NotasService {
  static async create(data) {
    return (await httpClient.post(`${prefix}`, data)).data;
  }

  static async getAll() {
    return (await httpClient.get(`${prefix}`)).data;
  }

  static async getAllActive() {
    return (await httpClient.get(`${prefix}/getNotes/Active`)).data;
  }

  static async getNotasByUser(id) {
    return (await httpClient.get(`${prefix}/getMyNotes/${id}`)).data;
  }

  static async getNotesByFilter(data) {
    return (await httpClient.get(`${prefix}/getNotes/filter?word=${data}`))
      .data;
  }
}
