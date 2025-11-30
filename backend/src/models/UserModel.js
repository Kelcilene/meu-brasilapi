import { connect } from "../config/db.js"

export class UserModel {
    static async findByUsername(username) {
        const db = await connect()
        return db.get("SELECT * FROM users WHERE username = ?", username)
    }
}

