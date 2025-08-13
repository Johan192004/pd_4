import { URL_DB } from "./config.js"

/*USERS*/

export async function getUsers() {
    let res = await fetch(URL_DB + "/users")
    let resJson = await res.json()
    return resJson
}

export async function postUser(nameP,emailP,passwordP){
    let res = await fetch(URL_DB + "/users",{
        "method":"POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify({
            name:nameP,
            email:emailP,
            password:passwordP,
        })
    })
    let resJson = await res.json()
    return resJson
}

/*CLIENTS*/

export async function getClients() {
    let res = await fetch(URL_DB + "/clients")
    let resJson = await res.json()
    return resJson
}

export async function postClient(documentP,nameP,addressP,phone_numberP,emailP){
    let res = await fetch(URL_DB + "/clients",{
        "method":"POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify({
            document:documentP,
            name:nameP,
            address:addressP,
            phone_number:phone_numberP,
            email:emailP
        })
    })
    let resJson = await res.json()
    return resJson
}

export async function deleteClient(id) {
    let res = await fetch(`${URL_DB}/clients/${id}`,{
        "method": "DELETE",
        "headers":{
            "Content-Type":"application/json"
        }
    })
    return res
}

export async function putClient(idP,nameP,addressP,phone_numberP,emailP){
    let res = await fetch(`${URL_DB}/clients/${idP}`,{
        "method":"PUT",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify({
            name:nameP,
            address:addressP,
            phone_number:phone_numberP,
            email:emailP
        })
    })
    let resJson = await res.json()
    return resJson
}