import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Variável para armazenar a instância da conexão
let db = null;

export async function connect() {     //POOL DE CONEXAO
    if (db) {
        return db; // Retorna a instância existente se já estiver aberta
    }

    db = await open({
        filename: path.join(__dirname, "database.db"),
        driver: sqlite3.Database
    });

    return db;
}