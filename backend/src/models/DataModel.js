import { connect } from "../config/db.js"

export class DataModel {
    static async search(term) {
        const db = await connect()
        return db.all(
            "SELECT * FROM dados WHERE nome LIKE ?",
           [`%${term}%`]
        )
    }

    static async insert(obj) {
        const db = await connect()
        let { nome, categoria, cidade } = obj

        return db.run(
            "INSERT INTO dados (nome, categoria, cidade) VALUES (?, ?, ?)",
            nome, categoria, cidade
        )
    }
}
