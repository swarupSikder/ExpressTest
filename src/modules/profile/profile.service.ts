import { pool } from "../../../db";

const createProfileIntoDB = async (payLoad: any) => {
    const { user_id, bio, address, phone, gender } = payLoad;

    const user = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [user_id]
    );

    if(user.rowCount === 0){
        throw new Error ("User Not Exists!!!");
    }

    const result = await pool.query(`
        INSERT INTO profiles (user_id, bio, address, phone, gender)
            values ($1, $2, $3, $4, $5) RETURNING *;
        `, [user_id, bio, address, phone, gender]
    );

    return result;
}

export const profileService = {
    createProfileIntoDB,
}