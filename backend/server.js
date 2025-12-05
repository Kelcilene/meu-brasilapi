import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { router as authRoutes } from './src/routes/auth.js';
import { router as dataRoutes } from './src/routes/data.js';
import { router as cepRoutes } from './src/routes/cep.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.xssFilter());
app.use(compression());
app.use(morgan("combined"));

// Rate limit login
app.use('/login', rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Muitas tentativas. Tente novamente mais tarde."
}));

// Rotas
app.use('/auth', authRoutes);
app.use('/api', dataRoutes);
app.use('/api/cep', cepRoutes);

// Conexão SQLite no container (pasta /app/data)
const db = await open({
    filename: path.join('./data', 'meubanco.sqlite'),
    driver: sqlite3.Database
});

app.locals.db = db;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});
