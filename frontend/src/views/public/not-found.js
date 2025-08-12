export function viewNotFound(){
    const appContainer = document.getElementById("app")
    appContainer.innerHTML = `<div class="px-4 pt-5 my-5 text-center border-bottom">
            <h1 class="display-4 fw-bold">Error</h1>
            <div class="col-lg-6 mx-auto text-center">
                <p class="lead mb-4">Page not found</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3" id="goPage">Go to main page</button>
                </div>
            </div>
        </div>`
    
        scriptNotFound()

}


function scriptNotFound(){
    const buttonGoPage = document.getElementById("goPage")
    buttonGoPage.addEventListener("click",()=>{
        window.location.hash = ""
    })

    window.sessionStorage.setItem("location","none")
}