import mysql from 'mysql2/promise'

const db = mysql.createPool({
host: 'localhost',
user: 'root',
password: 'Barusu2024*',
database: 'usertest_db'
})

console.log('MySQL conectado!')

export default db