import { routesFunction } from "./src/Router.js"


window.addEventListener("hashchange",()=>{
    let path = window.location.hash;
    routesFunction(path)();
})

document.addEventListener("DOMContentLoaded",()=>{
    let path = window.location.hash;
    console.log(path)
    routesFunction(path)();
})