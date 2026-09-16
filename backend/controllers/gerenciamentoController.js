import db from '../database/database.js'

export async function alterarRotatividade(req, res) {
    try {
        const { uid, saldo, debito } = req.body
        const sql = `
            INSERT INTO gerenciamentoFinanceiro (uid, saldo, debito)
            VALUES (?, ?, ?)
        `
        await db.query(sql, [
            uid,
            saldo,
            debito
        ])
        res.status(201).json({
            mensagem: 'Saldo criado com sucesso!'
        })
    } catch (erro) {
        console.error('ERRO NO CADASTRO:', erro)
        res.status(500).json({
            erro: erro.message
        })
    }
}
