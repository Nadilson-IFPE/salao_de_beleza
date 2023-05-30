import express, { Application, NextFunction, Request, Response } from "express";
import { UserRoutes } from "./routes/users.routes";
import cors from "cors";


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

const userRoutes = new UserRoutes().getRoutes();

app.use('/users', userRoutes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            message: err.message,
        });
    }
    return response.status(500).json({
        message: 'Internal Server Error',
    })
})


app.listen(3000, () => console.log('Server is running'));






