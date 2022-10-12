import axios from "axios";

const URL = "http://192.168.1.5:3000"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGJhNjg2N2EzNzEzODkwOWRjZjg0YiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjUzNDQ1NTk3LCJleHAiOjE2NTM0NjM1OTd9.557NwcB1QwCXpIZl09faxzbOCh19kVbpy66xTsdN8do"

const getChats = async () => {
  var data : any
  await axios({
    url: `${URL}/chat`,
    method: "get",
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  }).then(response => {
    // console.log(response.data)
    // return response.data;
    data = response.data
    
  }).catch(error => {
    console.log(error.response)
  });
  return data
}

const getMessages =async (chatId:any) => {
  var data : any;
  await axios({
    url: `${URL}/message/${chatId}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  }).then(response => {
    // return response.data;
    data = response.data
    
  }).catch(error => {
    console.log(error.response)
  });
  return data;
}


export {getChats,getMessages}