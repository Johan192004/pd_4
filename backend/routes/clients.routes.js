const db = require('../db')
const express = require('express')
const router = express.Router()

router.get('/',async(req,res)=>{

    try {
        let result = await db.query('SELECT * FROM clients')
        res.status(200).json(result[0])
    } catch (error) {

        console.error("Error al obtener los clientes",error)
        res.status(500).json({error:'Error interno del servidor'})
    }
})

module.exports = router;