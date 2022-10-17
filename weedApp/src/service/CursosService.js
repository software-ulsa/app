import httpClient from "./HttpClient.js";

const prefix = '/cursos';

export default class CursoService{
    static async getAll(){
        return (await httpClient.get(`${prefix}`)).data;
    }

}