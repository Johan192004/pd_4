import { viewLogin } from "./views/public/login.js"
import { viewDashboard } from "./views/private/dashboard.js"
import { viewRegisterUser } from "./views/public/registerUser.js"
import { viewNotFound } from "./views/public/not-found.js"
import { viewWelcome } from "./views/public/welcome.js"
import { viewClients } from "./views/private/dashboard/clients.js"


export function routesFunction(url){
    switch (url){
        case "":
            return viewWelcome;
        case "#/login":
            return viewLogin;
        case "#/registerUser":
            return viewRegisterUser;
        case "#/dashboard":
            return viewDashboard;
        case "#/dashboard/clients":
            return viewClients;
        case "#/notFound":
            return viewNotFound;
        default:
            return notFound
    }


}

function notFound(){

    window.location.hash = "#/notFound"

}