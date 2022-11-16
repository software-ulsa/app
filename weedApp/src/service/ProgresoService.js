import httpClient from "./HttpClient";

export default class ProgresoService{
    static async getProgreso(curso, usuario){
        return (await httpClient.get('/progreso/'+curso+'&'+usuario)).data;
    }
}