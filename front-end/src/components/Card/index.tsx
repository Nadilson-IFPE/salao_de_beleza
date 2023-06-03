import style from './Card.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { getHours, isAfter } from 'date-fns';
import { AiOutlineEdit } from 'react-icons/ai';

interface ISchedule {
    name: string;
    phone: string;
    date: string;
    id: string;
}

export const Card = ({ id, name, phone, date }: ISchedule) => {
    const isAfterDate = isAfter(new Date(date), new Date());

    let phoneFormatted = phone.replace(/\D/g, '');
    phoneFormatted = phoneFormatted.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

    return (
        <div className={style.background}>
            <div>
                <span className={`${!isAfterDate && style.disabled}`}>
                    {getHours(new Date(date))}h
                </span>
                <p>{name} - {phoneFormatted}</p>
            </div>
            <div className={style.icons}>
                <AiOutlineEdit color="#5F68B1" size={17} />
                <RiDeleteBinLine color="#EB2E2E" size={17} />
            </div>
        </div>
    )
}