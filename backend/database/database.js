import mysql from 'mysql2/promise'

console.log('DB_HOST:', process.env.DB_HOST)
console.log('DB_PORT:', process.env.DB_PORT)
console.log('DB_USER:', process.env.DB_USER)
console.log('DB_NAME:', process.env.DB_NAME)

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'defaultdb',
    // ssl: {
    //     rejectUnauthorized: false
    // }
})

try {
    await db.query('SELECT 1')
    console.log('MySQL Aiven conectado com sucesso!')
} catch (erro) {
    console.error('ERRO AO CONECTAR AO MYSQL:', erro)
}

export default db