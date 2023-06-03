import style from './Login.module.css';
import logo from '../../assets/logo.webp';
import { Input } from '../../components/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';

interface IFormValues {
    email: string;
    password: string;
}

export function Login() {
    const { signIn } = useAuth();

    const schema = yup.object().shape({
        email: yup.string().email('Digite um e-mail válido!').required('Campo de e-mail obrigatório!'),
        password: yup.string().required('Campo de senha obrigatório!'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({ resolver: yupResolver(schema) });

    const submit = handleSubmit(({ email, password }) => {
        try {
            signIn({ email, password, });
        } catch (error) {
//
        }
    });

    return (
        <div className={style.background}>
            <div className={`container ${style.container}`}>
                <div className={style.wrapper}>
                    <div>
                        <img src={logo} alt='' />
                    </div>
                    <div className={style.card}>
                        <h2>Olá. Seja bem-vindo!</h2>
                        <form onSubmit={submit}>

                            <Input
                                placeholder='E-mail'
                                type='text'
                                {...register('email', { required: true })}
                                error={errors.email && errors.email.message}
                                icon={<AiOutlineMail size={20} />} />

                            <Input
                                placeholder='Senha'
                                type='password'
                                {...register('password', { required: true })}
                                error={errors.password && errors.password.message}
                                icon={<BsKey size={20} />} />

                            <Button text="Entrar" />
                        </form>
                        <div className={style.register}>
                            <span>Ainda não tem conta? <Link to={'/register'}>Cadastre-se.</Link>{' '}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}