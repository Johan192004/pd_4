# ExpertSoftApp

**ExpertSoftApp** it is an web application to manage clients, developed to solve the problem of wrong, duplicated and no-normalized data. The system lets you manage clients and also lets you load the data through a csv file.

---

## Features

- **Safe login** with validation
- **complete CRUD** for:
  - Clients
- **Andvanced querries**:
  - Total paid for each client.
  - Pending bills with client's info and the asosiated transaction.
  - List of transactions for each platform.
- **Masive load with a csv file**
- **Database normalized until third normal form**.
- **API REST** in Node.js + Express.

---

## Tecnologías Used

- **Backend:** Node.js + Express
- **Frontend:** HTML5, Bootstrap, JavaScript, CSS5
- **Database:** MySQL
- **Load of data:** Node.js (CSV con validación)
- **Version controller:** Git + GitHub
- **enviroment variables:** Dotenv

---


## Installation and execution

1. **Clone the repository**
   ```bash
   git clone https://github.com/Johan192004/pd_4.git
   ```

2. **Install dependencies**
   ```bash
   cd pd_4/backend
   npm i
   cd ../
   cd load_csv/
   npm i
   ```

3. **Create a database**
   - Create a mysql database.


4. **Setting enviroment variables**  
   Create an `.env` file in pd_4/backend and pd_4/load_csv, then enter the following code with the right credentials of you database.
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME=crudclinic
   PORT=3000
   ```
5. **Load the csv data**
   ```bash
   cd pd_4/load_csv
   node load.js
   ```

6. **Run the server**
   ```bash
   cd pd_4/backend
   node server.js
   ```

---

## Main endpoints

### Clients
| Método | Endpoint              | 
|--------|-----------------------|
| GET    | `/clients`            | 
| POST   | `/clients`            | 
| PUT    | `/clients/:id`        |  
| DELETE | `/clients/:id`        |

### Andvanced querries


#### Total paid for each client.
- Endpoint: `/reports/first`
- Obtains objects with the following structure:
```bash
    {
        "document": 7005498, //document of the client
        "name": "Johan", //name of the client
        "total_paid": "0" //total_paid of the client
    }
```

#### Pending bills with client's info and the asosiated transaction..
- Endpoint: `/reports/second`
- Obtains objects with the following structure:
```bash
    {
        "id_bill": "FAC1208", //id of the bill
        "period": "2024-07", //period of the bill
        "total_amount": 97457, //total amount of the bills
        "paid_amount": 96457, //paid amount of the bills
        "client_document": 857630459, 
        "client_name": "Valerie Brown",
        "id_transaction": "TXN040",
        "date_transaction": "2024-06-28T09:00:00.000Z",
        "amount_sent": 96457, //amount_sent in the transaction
        "state": "Pendiente", //state of the transaction
        "kind": "Pago de Factura", //kind of the transaction
        "platform": "Nequi" //platform of the transaction
    }
```

#### List of transactions for each platform..
- Endpoint: `/reports/third`
- You have add a header, where the key is `Content-Type` and the value `application/json`
- In the body, you put the kind of platform you'd like to filter:
```bash
    {
    "platform":"Nequi"
    }
```
- Obtains objects with the following structure:
```bash
    {
        "transaction_id": "TXN001",
        "general_date": "2024-06-01T15:00:00.000Z",     //date of the transaction
        "amount_sent": 38940,       //amount sent in the transaction
        "transaction_state": "Pendiente",
        "kind": "Pago de Factura",      //kind of transaction
        "platform": "Nequi",       //platform filtered
        "document": 149186547,      //document of the client
        "name": "Angel Daniel",     //name of the client
        "id_bill": "FAC7068",
        "total_amount": 39940,      //total amount of the bill
        "paid_amount": 0            //paid amount of the bill
    }
```

## Process of normalization

  
- Explained in the file `normalization.pdf`

---

## Credential to log in
- email: `johan2@gmail.com`
- password: `password`

## Repositoy Link
- `https://github.com/Johan192004/pd_4`

## Authors info

- **Name:** Johan Ramirez Marin
- **Clan:** Van Rossum
- **Email:** johanruma@gmail.com