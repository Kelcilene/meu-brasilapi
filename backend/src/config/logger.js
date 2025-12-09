import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretorio para logs
const logDir = path.join(__dirname, "../../logs");

// Configuração do Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Log de erros
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error"
    }),

    // Log geral do sistema
    new winston.transports.File({
      filename: path.join(logDir, "combined.log")
    }),

    // Mostra no console quando em desenvolvimento
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

export default logger;
