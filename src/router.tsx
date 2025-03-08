import {Route, Routes} from "react-router";
import {TodoAdd} from "./TodoAdd.tsx";
import {TodoList} from "./TodoList.tsx";
import {TodoListType} from "./Todos.tsx";

export const Path = {
    Main: "/",
    Add: "/add",
} as const;

type RoutingProps = {
    setDone: (key: number) => void;
    del: (key: number) => void;
    add: (deed: TodoListType) => void;
};

export const Routing = ({setDone, del, add}: RoutingProps) => {
    return (
        <Routes>
            <Route path={Path.Main} element={<TodoList  setDone={setDone} del={del}/>}/>
            <Route path={Path.Add} element={<TodoAdd add={add}/>}/>
        </Routes>
    );
};
