import httpClient from "./HttpClient.js";

const prefix = '/progreso';

export default class ActividadService{
    static async completar(curso_id,paciente_id,actividad_id){
        return (await httpClient.post(`${prefix}`,{curso_id,paciente_id,actividad_id})).data;
    }

    
}