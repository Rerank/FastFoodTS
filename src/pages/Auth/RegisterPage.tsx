import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import { useAuth } from '@/context/useAuth';
import { IS_DEMO } from '@/api/apiService';
import Link from '@/router/Link'
import './auth.css'

const RegisterPage = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useAuth();


    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        const apiError = await register(name, phone, password);
        setIsSubmitting(false);

        if (apiError) {
            setFormError(apiError.message);
            return;
        }

        //в случае успеха, вызываем функцию которую передали пропсом (если она есть)
        onSuccess?.();

    };

    const handleInputNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setFormError('');

    }

    const handleInputPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        setFormError('');

    }

    const handleInputPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setFormError('');
    }


    return (
        <>
            <main className="auth-page">
                <header className="auth-header">
                    <h1 className="auth-header__title">Создание нового аккаунта</h1>
                    {IS_DEMO && (
                        <p className="auth-header__subtitle">
                            Демо-режим: сервера нет, аккаунт исчезнет при перезагрузке страницы
                        </p>
                    )}
                </header>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label className="auth-field__label" htmlFor="registration-name">Имя</label>
                        <div className="auth-field__control">
                            <input
                                className="auth-field__input"
                                id="registration-name"
                                type="text"
                                name="name"
                                placeholder="Анна Иванова"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={handleInputNameChange}
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label className="auth-field__label" htmlFor="registration-phone">Телефон</label>
                        <div className="auth-field__control">
                            <input
                                className="auth-field__input"
                                id="registration-phone"
                                type="tel"
                                name="phone"
                                placeholder="+7 900 123-45-67"
                                autoComplete="tel"
                                required
                                value={phone}
                                onChange={handleInputPhoneChange}
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label className="auth-field__label" htmlFor="registration-password">Пароль</label>
                        <div className="auth-field__control">
                            <input
                                className="auth-field__input"
                                id="registration-password"
                                type="password"
                                name="password"
                                placeholder="Придумайте пароль"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                value={password}
                                onChange={handleInputPasswordChange}
                            />
                            <button
                                className="auth-field__toggle"
                                type="button"
                                aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                                aria-pressed={isPasswordVisible}
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >👁</button>
                        </div>
                        <p className="auth-field__hint">Минимум 8 символов</p>
                    </div>

                    {formError && (
                        <p className="auth-form__error" role="alert">{formError}</p>
                    )}
                    <button className="auth-form__submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Создание аккаунта...' : 'Создать аккаунт'}</button>
                </form>

                <p className="auth-switch">
                    Уже есть аккаунт?
                    <Link to="/login" className="auth-switch__link"> Войти</Link>
                </p>
            </main>
        </>
    )

}

export default RegisterPage;