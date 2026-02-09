import express from 'express';
import { pool } from "./db.js";
const app = express();
// Allow requests from your frontend origin
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});
app.use(express.json());
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0 || rows[0].password !== password) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
    res.json({ message: 'Login Successful' });
});
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    res.status(201).json({ message: "User Registered" });
});
app.post('/changeusername', async (req, res) => {
    const { newusername, username } = req.body;
    if (!newusername || !username) {
        return res.status(400).json({ error: "Both username and newusername are required." });
    }
    try {
        await pool.query('UPDATE users SET username = (?) WHERE username = (?)', [newusername, username]);
        res.json({ message: 'Username updated successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});
app.post('/checkpassword', async (req, res) => {
    const { username, oldpassword } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, oldpassword]);
        if (Array.isArray(rows) && rows.length > 0) {
            res.json({ success: true });
        }
        else {
            res.json({ success: false });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
app.listen(3000, () => {
    console.log('server running on port 3000');
});
