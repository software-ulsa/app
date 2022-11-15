import httpClient, { httpFormDataClient } from "./HttpClient";

const prefix = "/imagenes";

export default class ImagesService {
  static async upload(data) {   
    return (await httpFormDataClient.post(prefix, data)).data;
  }

  static async getImage(key) {
    return (await httpClient.get(`${prefix}/${key}`)).data;
  }

  
}
