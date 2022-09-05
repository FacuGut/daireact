import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://challenge-react.alkemy.org/"
})
const apiKey = "2532bbe5775d49d8adb09fcabb7184fe"

export const enviarEmailPsw= async (obj) =>{
    return axiosClient.post('', {
        ...obj
    }).then(response =>{
        if(response.status < 300){
            console.log(response.data)
            return response.data
        }
        else {
            console.log("Algo no funciona")
        }
    })
    .catch(function(err) {
        console.log("No funciona", err)
        alert("No funciona, ingrese los datos correctamente")
        throw err
    })
}
export const traerPlatos= async (query) =>{
    return axiosClient.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`,{})
    .then(function(res){
        console.log(res.data.results)
        return res.data.results
    })
    .catch(function(){
        throw "Error"
    })
}
export const detallePlato= async (id) =>{
    return axiosClient.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,{})
    .then(function(res){
        console.log(res.data)
        return res.data
    })
    .catch(function(){
        throw "Error"
    })
    
}