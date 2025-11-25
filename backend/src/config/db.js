import sqlite3 from "sqlite3"
import { open } from "sqlite"

export async function connect() {
    return open({
        filename: "./database.db",
        driver: sqlite3.Database
    })
}
