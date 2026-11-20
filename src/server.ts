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
                email VARCHAR(255) NOT NULL,
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

app.post("/", async (req: Request, res: Response) => {
    const { name, age, password } = req.body;

    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: { name, age },
    });
});

app.listen(port, () => {
    console.log(`Server is running at ${port} Post...`)
})