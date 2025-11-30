import bcrypt from "bcrypt";
import { connect } from "./db.js";

const username = "admin";
const password = "senha123";

const db = await connect();

const existing = await db.get("SELECT * FROM users WHERE username = ?", username);
if (existing) {
  console.log("Usuário já existe:", username);
  process.exit(0);
}

const hashed = await bcrypt.hash(password, 10);
await db.run("INSERT INTO users (username, password) VALUES (?, ?)", username, hashed);
console.log("Usuário criado:", username, "senha:", password);
process.exit(0);
