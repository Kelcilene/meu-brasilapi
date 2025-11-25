import express from 'express'
import jwt from 'jsonwebtoken'
import { DataModel } from '../models/DataModel.js'

export const router = express.Router()

// middleware de autenticação
function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ error: "Token não fornecido" })

    try {
        req.user = jwt.verify(token, "segredo")
        next()
    } catch {
        res.status(401).json({ error: "Token inválido" })
    }
}

// BUSCA
router.get("/buscar", auth, async (req, res) => {
    const q = req.query.q || ""
    const results = await DataModel.search(q)
    res.json(results)
})

// INSERÇÃO
router.post("/inserir", auth, async (req, res) => {
    const { nome, categoria, cidade } = req.body
    if (!nome) return res.status(400).json({ error: "Nome é obrigatório" })

    await DataModel.insert({ nome, categoria, cidade })
    res.json({ message: "Inserido com sucesso" })
})
