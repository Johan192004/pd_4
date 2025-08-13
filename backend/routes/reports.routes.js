const db = require('../db')
const express = require('express')
const router = express.Router()

router.get('/first',async(req,res)=>{

    try {
        let result = await db.query(`SELECT c.document, c.name, SUM(b.paid_amount) AS total_paid FROM clients c
            INNER JOIN bills b ON c.document=b.id_client
            GROUP BY c.document`)
        res.status(200).json(result[0])
    } catch (error) {

        console.error("Error al obtener la primera consulta avanzada",error)
        res.status(500).json({error:'Error interno del servidor'})
    }
})

router.get('/second',async(req,res)=>{

    try {
        let result = await db.query(`SELECT b.id AS id_bill, b.period, b.total_amount,b.paid_amount , c.document AS client_document, c.name AS client_name, t.id AS id_transaction, t.general_date AS date_transaction, t.amount_sent, t.state, t.kind, t.platform   FROM clients c
            INNER JOIN bills b ON c.document=b.id_client
            INNER JOIN transactions t ON t.id_bill=b.id
            WHERE b.paid_amount < b.total_amount`)
        res.status(200).json(result[0])
    } catch (error) {

        console.error("Error al obtener la segunda consulta avanzada",error)
        res.status(500).json({error:'Error interno del servidor'})
    }
})


router.get('/third',async(req,res)=>{

    try {
        const { platform } = req.body
        let result = await db.query(`SELECT t.id as transaction_id, t.general_date, t.amount_sent, t.state as transaction_state, t.kind, t.platform, c.document, c.name, b.id as id_bill, b.total_amount, b.paid_amount   FROM transactions t
            INNER JOIN bills b ON t.id_bill=b.id
            INNER JOIN clients c ON b.id_client=c.document
            WHERE t.platform = ?`,[platform])
        res.status(200).json(result[0])
    } catch (error) {

        console.error("Error al obtener la tercera consulta avanzada",error)
        res.status(500).json({error:'Error interno del servidor'})
    }
})

module.exports = router