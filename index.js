import 'dotenv/config'
import bodyparser from 'body-parser'
import express from 'express'
import pg from 'pg'

const app = express()
const port = 3000

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db.connect();

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => console.log(`Server running on port ${port}`))