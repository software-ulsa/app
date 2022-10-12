import axios from "axios";
import { URL } from "./common";
import AsyncStorage from "@react-native-community/async-storage";

const SignUp = (form:any) => {
    axios({
        method: 'post',
        url: `${URL}/users/register`,
        headers : {
            "content-type" : "application/json"
        },
        data: {
            name : form.name,
            email : form.email,
            password : form.password,
            phone : form.phone,
        }
        })
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
}

const storeData = async (value:any) => {
    try {
      await AsyncStorage.setItem('@token', value)
    } catch (e) {
      console.log(e);
      
    }
  }

  const storeUser =async (value:any) => {
      try {
          await AsyncStorage.setItem('@user',value)
      } catch (error) {
          console.log(error);
      }
  }

const getToken = async () : Promise<any> =>{
    try {
        const data = await AsyncStorage.getItem('@token')

        // setTimeout(() => {
        // console.log(data);
        return data;
        // }, 500);
    } catch (error) {
        
    }
    return null;
}

const getUser = async () : Promise<any> =>{
    try {
        var data = await AsyncStorage.getItem('@user')
        // data = JSON.parse(data)
        console.log(data);
        
    } catch (error) {}
}

const SignIn = (form:any) =>{
    let token: string;
    let user : {id : string, name : string, phone : string, avatar : string, email : string}
    axios({
        method : "post",
        url : `${URL}/users/login`,
        headers :{
            "content-type" : "application/json"
        },
        data : {
            email : form.email,
            password : form.password,
        }
    })
    .then(async (response)=>{
        token = response.data.accessToken
        user = {
            id : response.data._id,
            name : response.data.name,
            phone : response.data.phone,
            avatar : response.data.avatar,
            email : response.data.email,
        }
        
        return {token,user}
        
    })
    .then(({token,user})=>{
        storeData(token);
        storeUser(user)
        return {token,user};
    })
    .catch((error) => {
        console.log(error)
        throw error;
    })
}

export {SignUp, SignIn, getToken, getUser}

