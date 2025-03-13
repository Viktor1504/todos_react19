import {MouseEvent, useEffect, useState} from "react";
import {NavLink, Outlet} from "react-router";
import {setStateChangeHandler} from "./api.ts";
import {User} from "firebase/auth";

export const App = () => {
    const [showMenu, setShowMenu] = useState(false);

    const [user, setUser] = useState<User | null>(null);
    const authStateChanged = (user: User | null) => {
        setUser(user);
    };
    useEffect(() => {
        const unsubscribe = setStateChangeHandler(authStateChanged)
        return () => unsubscribe()
    }, [])

    const handleBurgerClick = (evt: MouseEvent<HTMLElement>) => {
        evt.preventDefault();
        setShowMenu(!showMenu);
    };

    return (
        <div className="container">
            <nav className="navbar is-light">
                <div className="navbar-brand">
                    <NavLink
                        to={'/'}
                        className={({isActive}) => 'navbar-item is-uppercase' +
                            (isActive ? 'is-active' : '')}
                    >
                        {user ? user.email : 'Todos'}
                    </NavLink>
                    <a
                        href="/"
                        className={showMenu ? 'navbar-burger is-active' : 'navbar-burger'}
                        onClick={handleBurgerClick}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>
                <div className={showMenu ? 'navbar-menu is-active' : 'navbar-menu'}
                     onClick={handleBurgerClick}
                >
                    <div className="navbar-start">
                        {user && (<NavLink
                                to="/add"
                                className={({isActive}) => 'navbar-item' + (isActive ? ' is-active' : '')}>
                                Создать дело
                            </NavLink>
                        )}
                        {!user && (
                            <NavLink to="/login"
                                     className={({isActive}) =>
                                         'navbar-item' + (isActive ? ' is-active' : '')}>
                                Войти
                            </NavLink>

                        )}
                        {!user && (<NavLink to={'/register'}
                                            className={({isActive}) => 'navbar-item' + (isActive ? ' is-active' : '')}>
                                Зарегистрироваться
                            </NavLink>
                        )}
                        {user && (
                            <div className="navbar-end">
                                <NavLink to="/logout" className="navbar-item">
                                    Выйти
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <main className="content px-6 py-6">
                <Outlet/>
            </main>
        </div>
    );
};
