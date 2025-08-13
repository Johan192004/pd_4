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


        const { document,name,address,phone_number,email } = req.body

        let result = await db.query('INSERT INTO clients(document,name,address,phone_number,email) VALUES (?,?,?,?,?);',[document,name,address,phone_number,email])
        
        res.status(201).json({
            message: 'Cliente creado correctamente',
            client: result[0]
        })

    } catch (error){
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'Hay un campo repetido ya existente',
                status:409
             });
        } else {
            
            res.status(500).json({ error: 'Error interno del servidor' }); // 500 Internal Server Error
        }
    }

})

router.delete('/:id',async(req,res)=>{

    try {
        const id = req.params.id
        let result = await db.query('DELETE FROM clients WHERE document=?',[id])
        const affectedRows = result[0].affectedRows;
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(204).send();
    } catch (error) {

        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }

})

router.put('/:id',async(req,res)=>{

    try {

        const id = req.params.id
        const { name,address,phone_number,email } = req.body

        let result = await db.query('UPDATE clients SET name=?,address=?,phone_number=?,email=? WHERE document=?;',[name,address,phone_number,email,id])
        
        const affectedRows = result[0].affectedRows;

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente actualizado correctamente' });


    } catch (error){
        console.error("Error al actualizar cliente",error)

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email ya está en uso',
                status : 409
             });
        }

        
        res.status(500).json({error:'Error interno del servidor'})
    }

})


module.exports = router;