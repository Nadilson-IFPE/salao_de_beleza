import { NextFunction, Request, Response } from "express";
import { SchedulesService } from "../services/SchedulesService";
import { parseISO } from "date-fns";

class SchedulesController {
    private scheduleService: SchedulesService;
    constructor() {
        this.scheduleService = new SchedulesService();
    }

    async store(request: Request, response: Response, next: NextFunction) {
        const { name, phone, date } = request.body;
        const { user_id } = request;

        try {
            const result = await this.scheduleService.create({
                name,
                phone,
                date,
                user_id,
            },);
            return response.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        const { date } = request.query;
        const parseDate = date ? parseISO(date.toString()) : new Date();
        try {
            const result = await this.scheduleService.index(parseDate);

            return response.json(result);

        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;
        const { date } = request.body;
        const { user_id } = request;
        try {
            const result = await this.scheduleService.update(id, date, user_id);
            return response.json(result);
        } catch (error) {
            next(error);
        }
    }
}

export { SchedulesController };