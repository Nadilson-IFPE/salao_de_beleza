import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../database/prisma";
import { ICreate } from "../interfaces/SchedulesInterface";

class SchedulesRepository {
    constructor() {

    }

    async create({ name, phone, date, user_id }: ICreate) {
        const result = await prisma.schedule.create({
            data: {
                name,
                phone,
                date,
                user_id,
            },
        });
        return result;
    }

    async find(date: Date, user_id: string) {
        const result = await prisma.schedule.findFirst({
            where: {
                date,
                user_id,
            },
        });
        return result;
    }

    async findById(id: string) {
        const result = await prisma.schedule.findUnique({
            where: {
                id,
            },
        });
        return result;
    }

    async findAll(date: Date) {
        const result = prisma.schedule.findMany({
            where: {
                date: {
                    gte: startOfDay(date),
                    lt: endOfDay(date),
                },
            },
            orderBy: {
                date: 'asc',
            },
        });
        return result;
    }

    async update(id: string, date: Date) {
        const result = await prisma.schedule.update({
            where: {
                id,
            },
            data: {
                date,
            },
        });
        return result;
    }
}

export { SchedulesRepository };