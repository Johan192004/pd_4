const mysql = require('mysql2/promise');
const fs = require('fs')
const csv = require('csv-parser');
require('dotenv').config()



async function loadData() {
    const client = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
    await client.connect()
    return new Promise((resolve,reject)=>{
        const rows = []
    fs.createReadStream('data.csv').pipe(csv({
        separator: ';',
        mapHeaders: ({ header }) => header.trim()
      })).on('data',(data)=>{
        rows.push(data)
      }).on('end',async()=>{
        try {

            const setDocuments = new Set()
            
            const setBills = new Set()

            const setTransactions = new Set()
            
            for(const row of rows){
                console.log(row)
                /*CLIENTS*/

                //This is the current document of the client
                let currentDocumentClient = parseInt(row.document)

                //It will enter the conditional if the document of the client has not been registered yet
                if(!setDocuments.has(currentDocumentClient)){
                    setDocuments.add(currentDocumentClient)

                    const name = row.name.trim()
                    const address = row.address.trim()
                    const phone_number = row.phone_number.trim()
                    const email = row.email.trim()

                    const result = await client.query("INSERT INTO clients(document,name,address,phone_number,email) VALUES(?,?,?,?,?)",[currentDocumentClient,name,address,phone_number,email])
                }  


                /*BILLS*/

                let currentBillId = row.id_bill.trim()

                //It will enter the conditional if the id of the bill (bill_number) has not registered yet
                if(!setBills.has(currentBillId)){
                    setBills.add(currentBillId)

                    const period = row.period.trim()
                    const total_amount = parseInt(row.total_amount)
                    const paid_amount = parseInt(row.paid_amount)

                    const result = await client.query("INSERT INTO bills(id,period,total_amount,paid_amount,id_client) VALUES(?,?,?,?,?)",[currentBillId,period,total_amount,paid_amount,currentDocumentClient])
                }

                /*TRANSACTIONS*/

                let currentTransactionId = row.id_transaction.trim()

                if(!setTransactions.has(currentTransactionId)){
                    setTransactions.add(currentTransactionId)

                    const general_date = row.general_date.trim()
                    const amount_sent = parseInt(row.amount_sent)
                    const state = row.state.trim()
                    const kind = row.kind.trim()
                    const platform = row.platform.trim()

                    const result = await client.query("INSERT INTO transactions(id,general_date,amount_sent,state,kind,platform,id_bill) VALUES(?,?,?,?,?,?,?)",[currentTransactionId,general_date,amount_sent,state,kind,platform,currentBillId])

                }

                    


            }

            await client.end()
            resolve()

        } catch (error) {
            await client.end()
            reject(error)
        }
      })
    })
    

    
}

async function main(){
    try {
        await loadData()
    } catch (error) {
        console.error(error)
    }
}

main()