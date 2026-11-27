import { JwtPayload } from './../../../node_modules/@types/jsonwebtoken/index.d';
import bcrypt from "bcryptjs";
import { pool } from "../../../db";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async (payLoad: { email: string; password: string }) => {
    const { email, password } = payLoad;

    const user = await pool.query(
        `SELECT * FROM users WHERE email=$1`, [email]
    );

    if (user.rowCount === 0) {
        throw new Error("Invalid Login !!!");
    }

    const checkPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!checkPassword) {
        throw new Error("Invalid Login !!!");
    }

    if (!user.rows[0].is_active) {
        throw new Error("User Blocked !!!");
    }



    const JwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email
    }
    const accessToken = jwt.sign(
        JwtPayload,
        "sdjfsdfgjsdfj8798789sfd",
        { expiresIn: "1d" }
    );
    return {accessToken, user: user.rows[0]};
}

export const authService = {
    loginUserIntoDB
}