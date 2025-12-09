import express from 'express'
import jwt from 'jsonwebtoken'
import { DataModel } from '../models/DataModel.js'
import { cacheMiddleware } from '../config/cache.js';
// import sanitizeHtml from 'sanitize-html' // Importa o sanitizador

export const router = express.Router()

// middleware de autenticação
function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ error: "Token não fornecido" })

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch {
        res.status(401).json({ error: "Token inválido" })
    }
}

//Função de Sanitização simples
function sanitize(input){
    if (!input).replace(/[<>/"'`;(){}]/g, "");
}

// BUSCA com cache + Sanitização
router.get("/buscar", auth, cacheMiddleware(300), async (req, res) => { // <-- APLICAÇÃO DO CACHE
    let q = (req.query.q || req.query.term || req.query.search || "").trim()
if (!q) {
        return res.status(400).json({ error: "Parâmetro de busca é obrigatório" })
    }    

// Sanitização da busca
  q = sanitize(q)

    try{
    const results = await DataModel.search(q)
    res.json(results)
    }catch (err){
        console.error("Erro na busca:", err)
        res.status(500).json({error: "Erro ao realizar a busca"})
    }
})

// INSERÇÃO
router.post("/inserir", auth, async (req, res) => {
    let { nome, categoria, cidade } = req.body

    if (!nome){
        return res.status(400).json({ error: "Nome é obrigatório" })
    }
    
    // sanitização dos campos
    nome = sanitize(nome)
    categoria = sanitize(categoria)
    cidade = sanitize(cidade)
    
 try {
        await DataModel.insert({ nome, categoria, cidade })
        res.json({ message: "Inserido com sucesso" })
    } catch (err) {
        console.error("Erro ao inserir:", err)
        res.status(500).json({ error: "Erro ao inserir no banco de dados" })
    }
})
