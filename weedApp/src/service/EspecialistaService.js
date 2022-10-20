import httpClient from "./HttpClient";

const prefix = '/especialistas'
export default class EspecialistaService{
    static async getAll(){
        return (await httpClient.get(prefix)).data;
    }
}