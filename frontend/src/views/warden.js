export function auth(){
    if(window.sessionStorage.getItem("auth")){

        if(window.sessionStorage.getItem("auth") == "true"){

            console.log("Estas logeado correctamente")

        } else {
            window.location.hash = "#/login"
        }

    } else {
        window.location.hash = "#/login"
    }
}