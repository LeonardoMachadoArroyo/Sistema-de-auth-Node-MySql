import mysql from 'mysql2/promise'

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
})

try {
    await db.query('SELECT 1')
    console.log('MySQL Aiven conectado com sucesso!')
    console.log('DB_HOST:', process.env.DB_HOST)
    console.log('DB_PORT:', process.env.DB_PORT)
    console.log('DB_USER:', process.env.DB_USER)
    console.log('DB_NAME:', process.env.DB_NAME)
} catch (erro) {
    console.error('ERRO AO CONECTAR AO MYSQL:', erro)
}

export default db