import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/UserModel.js"

export const router = express.Router()

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    if (!username || !password)
        return res.status(400).json({ error: "Usuário e senha são obrigatórios" })

    const user = await UserModel.findByUsername(username)
    if (!user) return res.status(401).json({ error: "Credenciais inválidas" })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(401).json({ error: "Credenciais inválidas" })


    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    
    res.json({ token })
})
