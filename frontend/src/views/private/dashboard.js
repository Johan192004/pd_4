import { auth } from "../warden.js"

export function viewDashboard(){
    auth()
    const appContainer = document.getElementById("app")
    
    let userName = window.sessionStorage.getItem("userName")

    
    appContainer.innerHTML = `<div class="row">
            <aside class="col-md-3 vh-100 d-flex align-items-center justify-content-between flex-column sticky-top">
                <div class="d-flex justify-content-start flex-column text-center flex-grow-1">
                    <div class="dropdown">
                        <img src="https://static.vecteezy.com/system/resources/previews/046/593/914/non_2x/creative-logo-design-for-real-estate-company-vector.jpg" alt="Imagen de la empresa" class="img-fluid" id="companyImage">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${userName}
                        </a>
                    
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" id="logOut">Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
                <div class="d-flex justify-content-start flex-grow-1">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <a href="/clients" class="text-decoration-none" id="buttonClients" data-link>Clientes</a>
                        </li>
                        <li class="list-group-item">
                            <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Reportes
                            </a>
                        
                            <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/reports/appointments" id="buttonReportsAppointments">Citas</a></li>
                            <li><a class="dropdown-item" href="/reports/appointments/doctor" id="buttonReportsAppointmentsDoctors">Filtrar citas por medico y rango de fechas</a></li>
                            <li><a class="dropdown-item" href="/reports/appointments/patient" id="buttonReportsAppointmentsPatients">Obtener pacientes con mas de 3 citas registradas</a></li>
                            <li><a class="dropdown-item" href="/reports/appointments/doctors" id="buttonReportsAppointmentsDoctors2">Listar medicos con el numero de citas atendidas en el ultimo mes</a></li>
                            <li><a class="dropdown-item" href="#">Consultar ingresos generados por metodo de pago en un rango de fechas</a></li>
                            </ul>
                            </li>
                    </ul>
                </div>
            </aside>
            <div id="dashboardField" class="col-md-9 min-vh-100 bg-dark d-flex justify-content-center align-content-start p-5 flex-wrap gap-5">
            </div>

        </div>`

        scriptDashboard()
    

    

}


async function scriptDashboard(){
    logOut()

    buttonClients()

}

async function logOut() {
    const logOutA = document.getElementById("logOut")
    logOutA.addEventListener("click",(e)=>{
        e.preventDefault()

        window.sessionStorage.clear()
        window.location.hash = ""
    })
}

async function buttonClients() {
    document.getElementById('buttonClients').addEventListener('click',(e)=>{
        e.preventDefault()
        let path = e.target.getAttribute("href")

        window.location.hash = "#/dashboard" + path
        

    })
}



