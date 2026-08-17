import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import { useAuth } from '@/context/useAuth';
import Link from '@/router/Link'
import './auth.css'

const LoginPage = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        const apiError = await login(phone, password);
        setIsSubmitting(false);

        if (apiError) {
            setFormError(apiError.message);
            return;
        }

        //в случае успеха, вызываем функцию которую передали пропсом (если она есть)
        onSuccess?.();

    };

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
                    <h1 className="auth-header__title">Войдите, чтобы оформить заказ</h1>
                </header>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label className="auth-field__label" htmlFor="login-phone">Телефон</label>
                        <div className="auth-field__control">
                            <input
                                className="auth-field__input"
                                id="login-phone"
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
                        <label className="auth-field__label" htmlFor="login-password">Пароль</label>
                        <div className="auth-field__control">
                            <input
                                className="auth-field__input"
                                id="login-password"
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="Введите пароль"
                                autoComplete="current-password"
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
                    </div>
                    {/* На будущее, сейчас скрыт т.к. не запланирован функционал */}
                    <a className="auth-form__forgot" href="#" hidden>Забыли пароль?</a>

                    {formError && (
                        <p className="auth-form__error" role="alert">{formError}</p>
                    )}
                    <button className="auth-form__submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Входим…' : 'Войти'}</button>
                </form>

                <p className="auth-switch">
                    Нет аккаунта?
                    <Link to="/register" className="auth-switch__link">Зарегистрироваться</Link>
                </p>
            </main>
        </>
    )

}

export default LoginPage;