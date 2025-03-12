import {FormEvent, useState} from "react";
import {useFetcher} from "react-router";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const fetcher = useFetcher();
    const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        await fetcher.submit({email, password}, {action: '/register', method: 'post'})
    };
    const handleFormReset = () => {
        setEmail('');
        setPassword('');
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
                </div>
                <div className={'field'}>
                    <label className={'label'}>Пароль</label>
                    <div className={'control'}>
                        <input type={'password'} value={password} className={'input'}
                               onChange={(evt) => setPassword(evt.currentTarget.value)}/>
                    </div>
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