import httpClient from "./HttpClient";
const prefix = "/codigo";

export default class CodigoService {
  static async validateCode(userId, code) {
    return (await httpClient.post(`${prefix}/${userId}/${code}`)).data;
  }
}
