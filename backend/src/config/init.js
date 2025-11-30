import { connect } from "./db.js";

const db = await connect()

await db.exec(`
   CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
   );
`)

await db.exec(`
   CREATE TABLE IF NOT EXISTS dados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      categoria TEXT,
      cidade TEXT
   );
`)
