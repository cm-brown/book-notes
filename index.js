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

async function getBooks() {
    const result = await db.query(
        `SELECT *, TO_CHAR(date, 'MM/DD/YYYY') AS formatted_date
        FROM books
        ORDER BY date DESC`
    );
    return result.rows;
}


app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', async (req, res) => {
    const books = await getBooks();
    res.render('index.ejs', { books: books });
});

app.get("/new", (req, res) => {
    res.render('new.ejs');
})

app.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const result = await db.query('SELECT * FROM books WHERE id = $1', [id]);
    const book = result.rows[0];
    res.render('edit.ejs', { book: book });
})

app.post("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { title, image, attribution, review, notes } = req.body;
    await db.query('UPDATE books SET title = $1, image = $2, attribution = $3, review = $4, notes = $5 WHERE id = $6', [title, image, attribution, review, notes, id]);
    res.redirect('/');
})

app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await db.query('DELETE FROM books WHERE id = $1', [id]);
    res.redirect('/');
})

app.post('/reviews', async (req, res) => {
    const { title, image, attribution, review, notes } = req.body;
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US');
    await db.query('INSERT INTO books (title, image, attribution, notes, review, date) VALUES ($1, $2, $3, $4, $5, $6)', [title, image, attribution, notes, review, formattedDate])
    res.redirect('/')
})

app.listen(port, () => console.log(`Server running on port ${port}`))