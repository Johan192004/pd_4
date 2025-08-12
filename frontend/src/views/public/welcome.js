export function viewWelcome(){
    const appContainer = document.getElementById("app")
    appContainer.innerHTML = `
        <div class="px-4 pt-5 my-5 text-center border-bottom">
            <h1 class="display-4 fw-bold">WorkCrud</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the
                    world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive
                    grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3" id="login">Log in</button>
                    <button type="button" class="btn btn-outline-secondary btn-lg px-4" id="registerU">Register user</button>
                </div>
            </div>
        </div>`


    const loginButton = document.getElementById("login")
    loginButton.addEventListener("click",(e)=>{
        // history.pushState({},"",history.pushState({},"",window.location.hash))
        window.location.hash = "#/login"
    })

    const registerButton = document.getElementById("registerU")
    registerButton.addEventListener("click",()=>{
        window.location.hash = "#/registerUser"
    })
    
}