const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const clientsRoutes = require('./routes/clients.routes')


const app = express()

app.use(cors())
app.use(express.json())
app.use('/clients',clientsRoutes)


const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000

app.listen(EXPRESS_PORT,(error)=>{
        if(error) throw error;

        console.log(`Express lanzado en: http://localhost:${EXPRESS_PORT}`)
    }

)