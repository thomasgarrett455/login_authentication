import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    password: "Clovis0123!", 
    database: "login_auth",
    waitForConnections: true, 
    connectionLimit: 10
});

