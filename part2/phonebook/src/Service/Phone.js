import axios from "axios";
const baseUrl="http://localhost:3001/persons"
const getAll=()=>{
    return axios.get(baseUrl).then(response=>response.data)
}

const add=(obj)=>{
   return axios.post(baseUrl,obj).then(response=>response.data)
}

const deletePerson = (id)=>{
    return axios.delete(`${baseUrl}/${id}`)
}
const Phoneservice={getAll,add,deletePerson}
export default Phoneservice;