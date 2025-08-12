import { deletePatient, getPatients, postPatient, putPatient} from "../../../Router.js"
import { viewDashboard } from "../dashboard.js"

export function viewPatients(){
    if(document.getElementById("dashboardField")){
        viewComplete()
    } else {
        viewDashboard()
        viewComplete()
        console.log("No habia cargado")

    }
}

/*<div class="col-md-9 mt-4">
                <div class="card">
                    <div class="card-body">
                        <a href="" class="btn btn-primary">Crear nuevo usuario</a>
                        <div class="table-responsive mt-3">
                            <table class="table table-hover table-border">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Correo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Robinson</td>
                                        <td>Cortes</td>
                                        <td>robinson@riwi.io</td>
                                        <td>
                                            <a href="" class="btn btn-sm btn-info">Detalles</a>
                                            <a href="" class="btn btn-sm btn-warning">Editar</a>
                                            <a href="" class="btn btn-sm btn-danger">Eliminar</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Robinson</td>
                                        <td>Cortes</td>
                                        <td>robinson@riwi.io</td>
                                        <td>
                                            <a href="" class="btn btn-sm btn-info">Detalles</a>
                                            <a href="" class="btn btn-sm btn-warning">Editar</a>
                                            <a href="" class="btn btn-sm btn-danger">Eliminar</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> */


async function viewComplete(){
    console.log("Entre al view patients")
    let appContainer = document.getElementById("dashboardField")
    appContainer.innerHTML = `<div class="col-md-9 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-center">
                            <h1>Pacientes</h1>
                        </div>
                        <div class="d-flex justify-content-end w-100">
                            <button class="btn btn-primary" id="createPatient">Crear nuevo paciente</button>
                        </div>
                        <div class="table-responsive mt-3">
                            <table class="table table-hover table-border">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyPatients">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`


    const newPatientButton = document.getElementById("createPatient")
    newPatientButton.addEventListener("click",()=>{

        newPatientFunction()

    })



    const patients = await getPatients()

    const tbodyPatients = document.getElementById('tbodyPatients')
        
    patients.forEach(element => {
        let tr = document.createElement("tr")
        tr.innerHTML = `<td>${element.id}</td>
                            <td>${element.name}</td>
                            <td>${element.email}</td>
                            <td>
                            <button class="btn btn-warning" id="edit${element.id}">Editar</button>
                            <button class="btn btn-danger" id="delete${element.id}">Eliminar</button>
                        </td>`
        
        tbodyPatients.appendChild(tr)
        const editButton = document.getElementById(`edit${element.id}`)

        editButton.addEventListener("click",()=>{
            editPatientFunction(element.id,element.name,element.email)
        })

        const deleteButton = document.getElementById(`delete${element.id}`)

        deleteButton.addEventListener("click",()=>{

            deletePatientFunction(element.id)
        })
    })

    window.sessionStorage.setItem("location","patients")
}

async function newPatientFunction() {
    let appContainer = document.getElementById("dashboardField")
    appContainer.innerHTML = `<div class="col-md-9 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-center">
                            <h1>Pacientes</h1>
                        </div>
                        <form id="postPatientForm">
                        <label for="name">Nombre</label>
                        <input type="text" id="name" class="form-control" required></input>
                        <label for="email">Correo Electronico</label>
                        <input type="email" id="email" class="form-control" required></input>
                        <div class="w-100 d-flex m-2 gap-2">
                            <button type="submit" class="btn btn-success">Crear paciente</button>
                            <button type="button" class="btn btn-secondary" id="goBack">Regresar</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>`
    
    const formPostPatient = document.getElementById("postPatientForm")
    formPostPatient.addEventListener("submit",async(e)=>{

        e.preventDefault()

        const nameValue = document.getElementById("name").value
        const emailValue = document.getElementById("email").value

        const result = await postPatient(nameValue,emailValue)
        if(result.status == 409){
            alert("El correo electronico ya esta registrado")
        } else {
            alert("Se ha registrado exitosamente el nuevo paciente")
            viewComplete()
        }


    })

    const goBackButton = document.getElementById("goBack")
    goBackButton.addEventListener("click",()=>{

        viewComplete()

    })

}


async function editPatientFunction(id,name,email) {
    let appContainer = document.getElementById("dashboardField")
    appContainer.innerHTML = `<div class="col-md-9 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-center">
                            <h1>Pacientes</h1>
                        </div>
                        <form id="putPatientForm">
                        <label for="name">Nombre</label>
                        <input type="text" id="name" class="form-control" value="${name}"required></input>
                        <label for="email">Correo Electronico</label>
                        <input type="email" id="email" class="form-control" value="${email}"required></input>
                        <div class="w-100 d-flex m-2 gap-2">
                            <button type="submit" class="btn btn-success">Editar paciente</button>
                            <button type="button" class="btn btn-secondary" id="goBack">Regresar</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>`
    
    const formPostPatient = document.getElementById("putPatientForm")
    formPostPatient.addEventListener("submit",async(e)=>{

        e.preventDefault()

        const nameValue = document.getElementById("name").value
        const emailValue = document.getElementById("email").value

        const result = await putPatient(id,nameValue,emailValue)
        console.log(result)
        if(result.status == 409){
            alert("El correo electronico ya esta registrado")
        } else {
            alert("Se ha actualizado exitosamente el paciente")
            viewComplete()
        }


    })

    const goBackButton = document.getElementById("goBack")
    goBackButton.addEventListener("click",()=>{

        viewComplete()

    })

}

async function deletePatientFunction(id) {
    
    let result = await deletePatient(id)
    if (result.status === 204) {
        alert("Paciente eliminado existosamente")
        viewComplete()
    } else {
        alert("Ocurrio un error eliminando el paciente")
    }
}