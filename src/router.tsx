import {createBrowserRouter, createRoutesFromElements, Route} from "react-router";
import {TodoAdd} from "./TodoAdd.tsx";
import {TodoList} from "./TodoList.tsx";
import {App, HydrateFallback} from "./App.tsx";
import {actTodo, addTodo, getTodo, getTodos, login, logout, onlyLoggedOut, register, requireAuth} from "./api.ts";
import {TodoDetail} from "./TodoDetail.tsx";
import {Error404} from "./Error404.tsx";
import {Register} from "./Register.tsx";
import {Login} from "./Login.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={'/'} element={<App/>}>
            <Route index={true} element={<TodoList/>} loader={getTodos} hydrateFallbackElement={<HydrateFallback/>}/>
            <Route path={'/'} loader={requireAuth}>
                <Route path={'/add'} element={<TodoAdd/>} action={addTodo}/>
                <Route path=':key' element={<TodoDetail/>} loader={getTodo} action={actTodo}
                       errorElement={<Error404/>}/>
            </Route>
            <Route path='register' element={<Register/>} action={register} loader={onlyLoggedOut}/>
            <Route path='login' element={<Login/>} action={login} loader={onlyLoggedOut}/>
            <Route path='logout' loader={logout}/>
        </Route>
    )
)