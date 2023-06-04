import { ForwardRefRenderFunction, forwardRef } from 'react';
import style from './InputSchedule.module.css';

interface IInput {
    placeholder: string;
    type: 'password' | 'text' | 'date';
    error?: string;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
    { placeholder, type, error, ...rest },
    ref,
) => {
    const currentValue = new Date().toISOString().split('T')[0];
    
    return (
        <div className={style.container}>
            <label htmlFor="">{placeholder}</label>
            <input type={type} ref={ref} {...rest} min={currentValue} />
            {error && <span>{error}</span>}
        </div>
    );
};

export const InputSchedule = forwardRef(InputBase);