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


router.get('/:id',async(req,res)=>{

    try {
        const id = req.params.id
        let result = await db.query('SELECT * FROM clients WHERE id=?',[id])
        res.status(200).json(result[0])
    } catch (error) {

        console.error("Error al obtener el usuario",error)
        res.status(500).json({error:'Error interno del servidor'})
    }
})



router.post('/',async(req,res)=>{

    try {


        const { name,email } = req.body

        let result = await db.query('INSERT INTO patients(name,email) VALUES (?,?);',[name,email])
        
        res.status(201).json({
            message: 'paciente creado correctamente',
            doctor: result.rows[0]
        })

        console.log(result)

    } catch (error){
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'El email ya está registrado',
                status:409
             });
        } else {
            
            res.status(500).json({ error: 'Error interno del servidor' }); // 500 Internal Server Error
        }
    }

})


module.exports = router;