import {FormEvent, useState} from "react";
import {useFetcher} from "react-router";

export const Register = () => {
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const fetcher = useFetcher()

    const resetErrorMessages = () => {
        setErrorEmail('');
        setErrorPassword('');
        setErrorPasswordConfirm('');
    }

    const validate = () => {
        resetErrorMessages()
        if (!email) {
            setErrorEmail('Введите адрес электронной почты');
            return false
        }
        if (!password) {
            setErrorPassword('Введите пароль');
            return false
        }
        if (!passwordConfirm) {
            setErrorPasswordConfirm('Введите повтор пароля');
            return false
        }
        if (password !== passwordConfirm) {
            setErrorPasswordConfirm('Пароли не совпадают');
            return false
        }
        return true
    }

    if (fetcher.data) {
        resetErrorMessages()
        if (fetcher.data === 'auth/email-already-in-use') {
            setErrorEmail('Пользователь с такой почтой уже существует')
        } else if (fetcher.data === 'auth/weak-password') {
            setErrorPassword('Пароль слишком слабый')
            setErrorPasswordConfirm('Пароль слишком слабый')
        }
        fetcher.data = undefined
    }

    const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (validate()) {
            await fetcher.submit({email, password}, {action: '/register', method: 'post'})
        }
    };
    const handleFormReset = () => {
        setEmail('');
        setPassword('');
        setPasswordConfirm('')
    }
    return (
        <section>
            <h1>Регистрация</h1>
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
                <div className={'field'}>
                    <label className={'label'}>Адрес электронной почты</label>
                    <div className={'control'}>
                        <input type={'email'} value={email} className={'input'}
                               onChange={(evt) => setEmail(evt.currentTarget.value)}/>
                    </div>
                    {errorEmail && <p className="help is-danger">{errorEmail}</p>}
                </div>
                <div className={'field'}>
                    <label className={'label'}>Пароль</label>
                    <div className={'control'}>
                        <input type={'password'} value={password} className={'input'}
                               onChange={(evt) => setPassword(evt.currentTarget.value)}/>
                    </div>
                    {errorPassword && <p className="help is-danger">{errorPassword}</p>}
                </div>
                <div className={'field'}>
                    <label className={'label'}>Повтор пароля</label>
                    <div className={'control'}>
                        <input type={'password'} value={passwordConfirm} className={'input'}
                               onChange={(evt) => setPasswordConfirm(evt.currentTarget.value)}/>
                    </div>
                    {errorPasswordConfirm && <p className="help is-danger">{errorPasswordConfirm}</p>}
                </div>
                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <input type="reset" className="button is-warning is-light" value="Cбpoc"/>
                    </div>
                    <div className="control">
                        <input type="submit" className="button is-primary" value="Регистрация"/>
                    </div>
                </div>
            </form>
        </section>
    )
}