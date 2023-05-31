import { Router } from "express";
import { SchedulesController } from "../controllers/SchedulesController";
import { AuthMiddleware } from "../middlewares/auth";

class SchedulesRoutes {
    private router: Router;
    private schedulesController: SchedulesController;
    private authMiddleware: AuthMiddleware;
    constructor() {
        this.router = Router();
        this.schedulesController = new SchedulesController();
        this.authMiddleware = new AuthMiddleware();
    }

    getRoutes(): Router {
        this.router.post(
            '/',
            this.authMiddleware.auth.bind(this.authMiddleware),
            this.schedulesController.store.bind(this.schedulesController),);

        this.router.get(
            '/',
            this.authMiddleware.auth.bind(this.authMiddleware),
            this.schedulesController.index.bind(this.schedulesController),);

        this.router.put(
            '/:id',
            this.authMiddleware.auth.bind(this.authMiddleware),
            this.schedulesController.update.bind(this.schedulesController),);

        return this.router;
    }
}

export { SchedulesRoutes };