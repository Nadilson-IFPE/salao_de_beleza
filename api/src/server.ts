import express, { Application, NextFunction, Request, Response } from "express";
import { UserRoutes } from "./routes/users.routes";
import cors from "cors";
import { SchedulesRoutes } from "./routes/schedules.routes";


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

const userRoutes = new UserRoutes().getRoutes();
const schedulesRoutes = new SchedulesRoutes().getRoutes();

app.use('/users', userRoutes);
app.use('/schedules', schedulesRoutes);

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

const port = 3000;
app.listen(port, () => console.log(`STATUS: Server is running at port ${port}.`));






