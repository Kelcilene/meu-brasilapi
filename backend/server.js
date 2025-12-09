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

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// impedir força bruta no login
app.use('/auth/login', rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Muitas tentativas. Tente novamente mais tarde.'
}));

app.use('/auth', authRoutes);
app.use('/api', dataRoutes);
app.use('/api/cep', cepRoutes);

app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});
