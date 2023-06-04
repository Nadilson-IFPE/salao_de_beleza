import { AiOutlineClose } from 'react-icons/ai';
import style from './ModalEdit.module.css';
import { useAuth } from '../../hooks/auth';
import { formatISO, getHours, parseISO, setHours } from 'date-fns';
import { useState } from 'react';
import { api } from '../../server';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';


interface IModal {
    isOpen: boolean;
    handleChangeModal: () => void;
    hour: string;
    name: string;
    id: string;
}

export const ModalEdit = ({ isOpen, handleChangeModal, hour, name, id }: IModal) => {
    const { availableSchedules, schedules, date, handleSetDate } = useAuth();

    const [scheduleHour, setScheduleHour] = useState('');

    const currentValue = new Date().toISOString().split('T')[0];

    const filteredDate = availableSchedules.filter((hour) => {
        const isScheduleAvailable = !schedules.find((scheduleItem) => {
            const scheduleDate = new Date(scheduleItem.date);
            const scheduleHour = getHours(scheduleDate);
            return scheduleHour === Number(hour);
        });
        return isScheduleAvailable;
    });

   // console.log('filteredDate', filteredDate);

   const handleChangeHour = (hour: string) => {
    setScheduleHour(hour);
   }

   const updateData = async () => {
    const formattedData = formatISO(setHours(parseISO(date), parseInt(scheduleHour)),);
    try {
        await api.put(`/schedules/${id}`, {
            params: {
                date: formattedData,
            }
        });
        toast.success('Agendamento atualizado com sucesso!');
        handleChangeModal();
    } catch (error) {
        if (isAxiosError(error)) {
            toast.success(error.response?.data.message);
        }
    }
   }

    if (isOpen) {
        return (
            <div className={style.background}>
                <div className={style.modal}>
                    <div className={style.header}>
                        <h2>Editar Horário</h2>
                        <AiOutlineClose size={25} onClick={handleChangeModal} />
                    </div>
                    <div className={style.body}>
                        <p>{hour}h {name}</p>

                        <div className={style.input}>
                            <label htmlFor=''>Informe uma nova data:</label>
                            <input type='date' defaultValue={currentValue} min={currentValue} onChange={(e) => handleSetDate(e.target.value)} />
                        </div>

                        <div className={style.input}>
                            <label htmlFor=''>Informe um novo horário:</label>
                            <select name='' id='' onChange={(e) => handleChangeHour(e.target.value)}>
                                {filteredDate.map((hour, index) => {
                                    return (
                                        <option value={hour} key={index}>{hour}:00h</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={style.footer}>
                        <button onClick={handleChangeModal}>Cancelar</button>
                        <button onClick={updateData}>Editar</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<></>);
    }
}