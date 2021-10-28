const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

//midelware
app.use(cors());
app.use(express.json());

//-----ROUTES-----//

//--WAGES--//

//post a wage;

app.post('/mywage', async (req, res) => {
    const { wage } = req.body;
    const postWage = await pool.query(
        'INSERT INTO wage(wage) VALUES($1)',
        [wage],
        (err, response) => {
            if (err) {
                console.log(err);
            } else {
                res.send('Wage inserted!')
            }
        });
})

//get a wage

app.get('/getwage', async (req, res) => {
    try {
        const getWage = await pool.query(
            'SELECT * FROM wage'
        );
        res.json(getWage.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//update wage

app.put('/updatewage', (req, res) => {
    try {
        const { id } = req.body;
        const { wage } = req.body;
        const updateWage = pool.query(
            'UPDATE wage SET wage = $1 WHERE id = $2',
            [wage, id]
        );
        res.send(updateWage);
    } catch (error) {
        console.error(error.message);
    }
})

//--SPENGINGS--//

//post spending

app.post('/newspending', async (req, res) => {
    try {
        const { spending } = req.body;
        const postSpending = await pool.query(
            'INSERT INTO spending(spending) VALUES($1)',
            [spending],
        )
        res.send('Spending Inserted!');
    } catch (error) {
        console.error(error.message);
    }
})

//get all spendings

app.get('/showspendings', async (req, res) => {
    try {
        const getAllSpendings = await pool.query(
            'SELECT * FROM spending',
        );
        res.send(getAllSpendings.rows);
    } catch (error) {
        console.error(error.message)
    }
})

//delete a spending

app.delete('/deletespending/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSpending = await pool.query(
            'DELETE FROM spending WHERE id = $1',
            [id]
        );
    } catch (error) {
        console.error(error.message);
    }
})

//server
app.listen(3001, () => {
    console.log('Server running on port 3001');
})  