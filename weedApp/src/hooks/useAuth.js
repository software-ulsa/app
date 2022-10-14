import { AuthContext } from "../navigation/AppNavigation";
import {useContext} from 'react';

export const useAuthToken = ()=>{
    const {toke} = useContext(AuthContext);
    return toke;
}