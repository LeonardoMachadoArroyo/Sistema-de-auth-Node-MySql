import db from '../database/database.js'

export async function cadastrar(req, res) {
    try {
        const { nome, email, senha } = req.body
        const sql = `
            INSERT INTO authapp (nome, email, senha)
            VALUES (?, ?, ?)
        `
        await db.query(sql, [
            nome,
            email,
            senha
        ])
        res.status(201).json({
            mensagem: 'Conta criada com sucesso!'
        })
    } catch (erro) {
        console.error('ERRO NO CADASTRO:', erro)
        res.status(500).json({
            erro: erro.message
        })
    }
}
export async function login(req, res) {
    try {
        const { email, senha } = req.body
        const [usuarios] = await db.query(
            'SELECT * FROM authapp WHERE email = ? AND senha = ?',
            [email, senha]
        )
        if (usuarios.length === 0) {
            return res.status(401).json({
                erro: 'Email ou senha incorretos'
            })
        }
        const usuario = usuarios[0]
        res.json({
            mensagem: 'Login realizado!',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        })
        console.log("login bem executado")
    } catch (erro) {
        console.log(erro)
        res.status(500).json({
            erro: 'Erro ao realizar login'
        })
    }
}