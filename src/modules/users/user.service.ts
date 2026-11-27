import { pool } from "../../../db";
import { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payLoad: IUser) => {
    const { name, email, password, age } = payLoad;

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
                    values ($1, $2, $3, $4) RETURNING *;
        `, [name, email, hashPassword, age]
    );

    delete result.rows[0].password;
    return result;
}

const showAllUsersFromDB = async () => {
    const result = await pool.query(`
            SELECT * FROM users;    
        `);

    return result;
}

const showSingleUserFromDB = async (id: string) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );

    return result;
}

const updateSingleUserFromDB = async (payLoad: IUser, id: string) => {
    const { name, password, age, is_active } = payLoad;

    const result = await pool.query(
        `UPDATE users SET
                name = COALESCE($1, name),
                password = COALESCE($2, password),
                age = COALESCE($3, age),
                updated_at = NOW(),
                is_active = COALESCE($4, is_active)
            WHERE id = $5
            RETURNING *`,
        [
            name ?? null,
            password ?? null,
            age ?? null,
            is_active ?? null,
            id
        ]
    );

    return result;
}


const deleteSingleUserFromDB = async (id: string) => {
    const result = await pool.query(
        `DELETE FROM users WHERE id = $1 RETURNING *`,
        [id]
    );

    return result;
}


export const userService = {
    createUserIntoDB,
    showAllUsersFromDB,
    showSingleUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB
}