import express, { Application, Request, Response } from "express"
import { Pool } from "pg";

const app: Application = express()
const port = 3000

app.use(express.json());

// POOL URL
const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_Xv5OqGoh7bPD@ep-fancy-night-a1wsy99w.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require",
});

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                age INT,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );    
        `);
        console.log("Database Connected!!");
    } catch (err) {
        console.log(err);
    }
}

initDB();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "Swarup",
    });
})


//-------------------//
//  CREATE NEW USER  //
//-------------------//
app.post("/api/v1/users", async (req: Request, res: Response) => {
    try {
        const { name, email, password, age } = req.body;
        const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
                    values ($1, $2, $3, $4) RETURNING *;
        `, [name, email, password, age]
        );

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: result.rows[0],
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err?.message,
            error: err,
        });
    }
});


//------------------//
//  SHOW ALL USERS  //
//------------------//
app.get("/api/v1/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT * FROM users;    
        `);

        res.status(200).json({
            success: true,
            message: "All Users Displayed Successfully...",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err?.message,
            error: err,
        });
    }
});


//----------------------//
//  SHOW A SINGLE USER  //
//----------------------//

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: `ID: ${id} User Not Found!!!`
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: `ID: ${id} User Displayed Successfully...`,
            data: result.rows[0]
        });

    } catch (err: unknown) {
        res.status(500).json({
            success: false,
            message: err instanceof Error
                ? err.message
                : "Internal Server Error"
        });
    }
});


//----------------------//
//  UPDATE SINGLE USER  //
//----------------------//
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        //handle error
        const data = req.body;
        const { name, password, age, is_active } = req.body;
        data.find(async (user: IUser) => {
            if (user.id === id) {
                const result = await pool.query(`
                    UPDATE users SET
                    name = COALESCE($1, name),
                    password = COALESCE($2, password),
                    age = COALESCE($3, age),
                    is_active = COALESCE($4, is_active),
                    WHERE id = $5 RETURNING * 
                `, [name ?? null, password ?? null, age ?? null, is_active ?? null, id]);

                res.status(200).json({
                    success: true,
                    message: `ID: ${id} User Updated Successfully...`,
                    data: result.rows[0],
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `ID: ${id} User Not Found!!!`
                });
            }
        });


    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err?.message,
            error: err,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at ${port} Post...`)
})