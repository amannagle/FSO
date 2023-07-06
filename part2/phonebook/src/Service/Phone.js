import axios from "axios";
const baseUrl="http://localhost:3001/api/persons"
const getAll=()=>{
    return axios.get(baseUrl).then(response=>response.data)
}

const add=(obj)=>{
   return axios.post(baseUrl,obj).then(response=>response.data)
}

const deletePerson = (id)=>{
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response=>response.data)
  }
const Phoneservice={getAll,add,deletePerson,update}
export default Phoneservice;