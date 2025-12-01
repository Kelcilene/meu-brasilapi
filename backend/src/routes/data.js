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

// BUSCA
router.get("/buscar", auth, cacheMiddleware(300), async (req, res) => { // <-- APLICAÇÃO DO CACHE
    const q = req.query.q || ""
    const results = await DataModel.search(q)
    res.json(results)
})

// INSERÇÃO
router.post("/inserir", auth, async (req, res) => {
    let { nome, categoria, cidade } = req.body

    if (!nome) return res.status(400).json({ error: "Nome é obrigatório" })

    //Sanitização para prevenir XSS antes de enviar para o Model
    // const sanitizeOptions = {
    //    allowedTags: [], // Nenhuma tag HTML é permitida
    //    allowedAttributes: {}, // Nenhum atributo é permitido
    //    transformTags: {
    //        'script': (tagName, attribs) => ({tagName: '', textContent: ''})
    //    }
    //};

    //nome = sanitizeHtml(nome, { allowedTags: [], allowedAttributes: {} });
    //categoria = sanitizeHtml(categoria, { allowedTags: [], allowedAttributes: {} });
    //cidade = sanitizeHtml(cidade, { allowedTags: [], allowedAttributes: {} });
    
    await DataModel.insert({ nome, categoria, cidade })
    res.json({ message: "Inserido com sucesso" })
})
