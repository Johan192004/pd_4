import { routesFunction } from "./src/Router.js"
// const appContainer = document.getElementById("app")


function verifyHash(){
    let currentHash = window.location.hash
    if(currentHash == ""){
        window.location.hash = "#/"
    }
}



window.addEventListener("hashchange",()=>{
    let path = window.location.hash;
    routesFunction(path)();
})

document.addEventListener("DOMContentLoaded",()=>{
    let path = window.location.hash;
    console.log(path)
    routesFunction(path)();
})

// window.addEventListener("popstate",()=>{
//     let path = window.location.hash;
//     routesFunction(path)();
// })