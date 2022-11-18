import httpClient from "./HttpClient";

export default class SuscripcionService{
    static async suscribirme(curso_id,paciente_id){
        return (await httpClient.post('/suscripciones', {curso_id,paciente_id})).data;
    }

    static async getMySubs(user_id){
        return (await httpClient.get('/suscripciones/'+user_id)).data;
    }
}