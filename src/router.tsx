import {createBrowserRouter, createRoutesFromElements, Route} from "react-router";
import {TodoAdd} from "./TodoAdd.tsx";
import {TodoList} from "./TodoList.tsx";
import {App} from "./App.tsx";
import {actTodo, addTodo, getTodo, getTodos} from "./api.ts";
import {TodoDetail} from "./TodoDetail.tsx";
import {Error404} from "./Error404.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={'/'} element={<App/>}>
            <Route index={true} element={<TodoList/>} loader={getTodos}/>
            <Route path={'/add'} element={<TodoAdd/>} action={addTodo}/>
            <Route path=':key' element={<TodoDetail/>} loader={getTodo} action={actTodo} errorElement={<Error404/>}/>
        </Route>
    )
)