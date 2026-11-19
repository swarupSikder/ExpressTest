import express, { Application, Request, Response } from "express"

const app: Application = express()
const port = 3000

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "Swarup",
    });
})

app.post("/", async (req: Request, res: Response) => {
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server is running at ${port} Post...`)
})