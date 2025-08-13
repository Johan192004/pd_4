import { getUsers } from "../../api.js"

export function viewLogin(){

    const appContainer = document.getElementById("app")
    appContainer.innerHTML = `
        <div class="row mt-5">
            <div class="col-md-4 offset-md-4">
                <div class="card">
                    <h1 class="card-title text-center">Login</h1>
                    <div class="card-body">
                        <form action="" id="formLogin">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                            <label for="password" class="mt-2">Password</label>
                            <input type="password" name="password" id="password" class="form-control" required>
                            <button type="submit" class="btn btn-primary w-100 mt-5">Login</button>
                        </form>
                        <div class="d-flex flex-row gap-5 justify-content-center mt-3" >
                            <a id="linkRegisterUser" class="btn">Don't have an account? register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`


    scriptLogin()

}


function verifyLogin(){

    // const user = await getUsersQuerry(``)

    const emailField = document.getElementById("email")
    const passwordField = document.getElementById("password")

    const formLogin = document.getElementById("formLogin")

    formLogin.addEventListener("submit", async(e)=>{
        e.preventDefault()

        const emailValue = emailField.value
        const passwordValue = passwordField.value
        let found = false

        let users = await getUsers()
        console.log(users)

        
        for(const user of users){

            if(user.email == emailValue){
                found = true

                if(user.password == passwordValue){

                    console.log("Iniciar sesion user")
                    window.location.hash = "#/dashboard"
                    window.sessionStorage.setItem("userName",user.name)
                    window.sessionStorage.setItem("auth",true)

                } else {
                    alert("Contraseña incorrecta")
                }
            } 
        }
        
    })

}

function scriptLogin(){
    if(window.sessionStorage.getItem("auth")=="true"){

        window.location.hash = "#/dashboard"

    }

    verifyLogin()

    const aRegisterUser = document.getElementById("linkRegisterUser")
    aRegisterUser.addEventListener("click",(e)=>{

        e.preventDefault()

        window.location.hash = "#/registerUser"

    })
}


