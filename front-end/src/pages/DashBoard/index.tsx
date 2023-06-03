import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from 'date-fns/locale';
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import style from './DashBoard.module.css';
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import { api } from "../../server";

interface ISchedule {
    name: string;
    phone: string;
    date: string;
    id: string;
}

export function DashBoard() {
    const [date, setDate] = useState(new Date());
    const [schedules, setSchedules] = useState<Array<ISchedule>>([]);
    const { user } = useAuth();

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const isWeekDay = (date: Date) => {
        const day = date.getDay();
        return day != 0 && day != 6;
    };

    const handleDateChange = (date: Date) => {
        setDate(date);
    }

    useEffect(() => {
        api.get('/schedules', {
            params: {
                date,
            },
        })
            .then((response) => {
                console.log(response);
                setSchedules(response.data);
            })
            .catch((error) => console.log(error));
    }, [date])

    return (
        <div className="container">
            <Header />
            <div className={style.dataTitle}>
                <h2>Olá, {user.name}.</h2>
                {/* <p>Esta é a sua lista de horários de hoje, {new Date().toLocaleDateString()}.</p> */}
                <p>Esta é a sua lista de horários {isToday(date) ? <span>de hoje, dia</span> : 'do dia '} {format(date, 'dd/MM/yyyy')}.</p>
            </div>
            <h2 className={style.nextSchedules}>Próximos horários</h2>
            <div className={style.schedule}>
                <div className={style.cardWrapper}>
                    {schedules.map((schedule, index) => {
                        return (
                            <Card
                                key={index}
                                date={schedule.date}
                                name={schedule.name}
                                phone={schedule.phone}
                                id={schedule.id}
                            />
                        );
                    })}
                </div>
                <div className={style.picker}>
                    <DayPicker
                        locale={ptBR}
                        className={style.calendar}
                        classNames={{
                            day: style.day,
                        }}
                        selected={date}
                        modifiers={{ available: isWeekDay }}
                        mode="single"
                        modifiersClassNames={{
                            selected: style.selected,
                        }}
                        fromMonth={new Date()}
                        disabled={[isWeekend, { before: new Date() }]}
                        onDayClick={handleDateChange}
                    />
                </div>
            </div>
        </div>
    )
}