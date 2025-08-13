import { viewDashboard } from "../dashboard.js"
import { getClients,deleteClient,postClient,putClient } from "../../../api.js"

export function viewClients(){
    if(document.getElementById("dashboardField")){
        viewComplete()
    } else {
        viewDashboard()
        viewComplete()
        console.log("No habia cargado")

    }
}

async function viewComplete(){
    console.log("Entre al view patients")
    let appContainer = document.getElementById("dashboardField")
    appContainer.innerHTML = `<div class="col-md-9 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-center">
                            <h1>Clientes</h1>
                        </div>
                        <div class="d-flex justify-content-end w-100">
                            <button class="btn btn-primary" id="create">Agregar cliente</button>
                        </div>
                        <div class="table-responsive mt-3">
                            <table class="table table-hover table-border">
                                <thead>
                                    <tr>
                                        <th>Documento</th>
                                        <th>Nombre</th>
                                        <th>Direccion</th>
                                        <th>Numero de telefono</th>
                                        <th>Correo Electronico</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`


    const newPatientButton = document.getElementById("create")
    newPatientButton.addEventListener("click",()=>{

        newFunction()

    })



    const items = await getClients()

    const tbodyPatients = document.getElementById('tbody')
        
    items.forEach(element => {
        let tr = document.createElement("tr")
        tr.innerHTML = `<td>${element.document}</td>
                            <td>${element.name}</td>
                            <td>${element.address}</td>
                            <td>${element.phone_number}</td>
                            <td>${element.email}</td>
                            <td>
                            <button class="btn btn-warning" id="edit${element.document}">Editar</button>
                            <button class="btn btn-danger" id="delete${element.document}">Eliminar</button>
                        </td>`
        
        tbodyPatients.appendChild(tr)
        const editButton = document.getElementById(`edit${element.document}`)

        editButton.addEventListener("click",()=>{
            editFunction(element.document,element.name,element.address,element.phone_number,element.email)
        })

        const deleteButton = document.getElementById(`delete${element.document}`)

        deleteButton.addEventListener("click",()=>{
            deleteFunction(element.document)
        })
    })

    window.sessionStorage.setItem("location","patients")
}

async function newFunction() {
    let appContainer = document.getElementById("dashboardField")
    appContainer.innerHTML = `<div class="col-md-9 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-center">
                            <h1>Agregar cliente</h1>
                        </div>
                        <form id="postForm">
                        <label for="document">Numero de documento</label>
                        <input type="number" id="document" class="form-control" required></input>
                        <label for="name">Nombre</label>
                        <input type="text" id="name" class="form-control" required></input>
                        <label for="address">Direccion</label>
                        <input type="text" id="address" class="form-control" required></input>
                        <label for="phone_number">Numero de telefono</label>
                        <input type="text" id="phone_number" class="form-control" required></input>
                        <label for="email">Correo Electronico</label>
                        <input type="email" id="email" class="form-control" required></input>
                        <div class="w-100 d-flex m-2 gap-2">
                            <button type="submit" class="btn btn-success">Agregar cliente</button>
                            <button type="button" class="btn btn-secondary" id="goBack">Regresar</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>`
    
    const formPostPatient = document.getElementById("postForm")
    formPostPatient.addEventListener("submit",async(e)=>{

        e.preventDefault()

        const clientsGet = await getClients()

        const documentNumber = document.getElementById("document").value
        const nameValue = document.getElementById("name").value
        const addressValue = document.getElementById("address").value
        const phoneNumberValue = document.getElementById("phone_number").value
        const emailValue = document.getElementById("email").value

        let foundCoincidence = false

        for(const client of clientsGet){
            if(client.document == documentNumber){
                alert(`El documento ${documentNumber} ya esta en uso`)
                foundCoincidence = true
                break;
            } else {

                if(client.email == emailValue){

                    alert(`El email ${emailValue} ya esta en uso`)
                    foundCoincidence = true
                    break;
                }

            }
        }


        if(foundCoincidence){

            console.log("Hubo un valor repetido")

        } else {
            if(documentNumber < 0){
                alert("El documento tiene que ser positivo")
            } else {
                const result = await postClient(documentNumber,nameValue,addressValue,phoneNumberValue,emailValue)
                if(result.status == 409){
                    alert("El valor de documento o email ya estan en uso")
                } else {
                    alert("Se ha registrado exitosamente el nuevo cliente")
                    viewComplete()
                }
            }
            
        }

        


    })

    const goBackButton = document.getElementById("goBack")
    goBackButton.addEventListener("click",()=>{

        viewComplete()

    })

}


async function editFunction(documentP,name,address,phone_number,email) {
    let appContainer = document.getElementById("dashboardField")
    appContainer.innerHTML = `<div class="col-md-9 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-center">
                            <h1>Editar cliente</h1>
                        </div>
                        <form id="putForm">
                        <label for="name">Nombre</label>
                        <input type="text" id="name" class="form-control" value="${name}" required></input>
                        <label for="address">Direccion</label>
                        <input type="text" id="address" class="form-control" value="${address}" required></input>
                        <label for="phone_number">Numero de telefono</label>
                        <input type="text" id="phone_number" class="form-control" value="${phone_number}" required></input>
                        <label for="email">Correo Electronico</label>
                        <input type="email" id="email" class="form-control" value="${email}" required></input>
                        <div class="w-100 d-flex m-2 gap-2">
                            <button type="submit" class="btn btn-success">Editar cliente</button>
                            <button type="button" class="btn btn-secondary" id="goBack">Regresar</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>`
    
    const formPostPatient = document.getElementById("putForm")
    formPostPatient.addEventListener("submit",async(e)=>{

        e.preventDefault()


        const nameValue = document.getElementById("name").value
        const addressValue = document.getElementById("address").value
        const phoneNumberValue = document.getElementById("phone_number").value
        const emailValue = document.getElementById("email").value

        

        
            const result = await putClient(documentP,nameValue,addressValue,phoneNumberValue,emailValue)
            console.log(result)
                if(result.status == 409){
                    alert(`El correo electronico ${emailValue} ya lo usa otro cliente`)
                } else {
                    alert("Se ha actualizado exitosamente el cliente")
                    viewComplete()
                }   



    })

    const goBackButton = document.getElementById("goBack")
    goBackButton.addEventListener("click",()=>{

        viewComplete()

    })

}

async function deleteFunction(id) {
    
    let result = await deleteClient(id)
    if (result.status === 204) {
        alert("Cliente eliminado existosamente")
        viewComplete()
    } else {
        alert("Ocurrio un error eliminando al cliente")
    }
}