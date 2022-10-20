import httpClient from "./HttpClient";

const prefix = "/imagenes";

export default class ImagesService {
  static async getImage(key) {
    return (await httpClient.get(`${prefix}/${key}`)).data;
  }
}
