import {FormEvent, useState} from "react";
import {useFetcher} from "react-router";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const fetcher = useFetcher();
    const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        await fetcher.submit({email, password}, {action: '/login', method: 'POST'})
    };
    const handleFormReset = () => {
        setEmail('');
        setPassword('');
    }
    return (
        <section>
            <h1>Вход</h1>
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
                        <input type="reset" className="button is-warning is-light" value="Cброс"/>
                    </div>
                    <div className="control">
                        <input type="submit" className="button is-primary" value="Вход"/>
                    </div>
                </div>
            </form>
        </section>
    )
}