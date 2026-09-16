import express from 'express'
// Adicione o .js no final do caminho
import { alterarRotatividade } from '../controllers/gerenciamentoController.js'

const router = express.Router()

router.post('/alterarRotatividade', alterarRotatividade)

export default router