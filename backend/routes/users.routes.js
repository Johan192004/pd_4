const db = require('../db')
const express = require('express')
const router = express.Router()

router.get('/',async(req,res)=>{

    try {
        let result = await db.query('SELECT * FROM users')
        res.status(200).json(result[0])
    } catch (error) {

        console.error("Error al obtener los usuarios",error)
        res.status(500).json({error:'Error interno del servidor'})
    }
})

router.post('/',async(req,res)=>{

    try {


        const { name,email,password } = req.body

        let result = await db.query('INSERT INTO users(name,email,password) VALUES (?,?,?);',[name,email,password])
        
        res.status(201).json({
            message: 'Usuario creado correctamente',
            userId: result[0].insertId,
            status:201
        })

    } catch (error){
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email ya está en uso',
                status : 409
             });
        } else {
        res.status(500).json({ error: 'Error interno del servidor' }); // 500 Internal Server Error
    }
    }

})

module.exports = router