import {TodoList} from "./TodoList.tsx";
import {useState} from "react";
import {TodoListType, todos as initialTodos} from "./Todos.tsx";
import {TodoAdd} from "./TodoAdd.tsx";

export const App = () => {
    const [todos, setTodos] = useState(initialTodos)
    const setDone = (key: number) => {
        setTodos(todos.map((todo) => (todo.key === key ? {...todo, done: !todo.done} : todo)))
    }

    const del = (key: number) => {
        setTodos(todos.filter((todo) => todo.key !== key))
    }

    const add = (deed: TodoListType) => {
        setTodos([...todos, deed])
    }

    return (
        <div className="container">
            <nav className="navbar is-light">
                <div className="navbar-b1rand">
                    <span className="navbar-item is-uppercase ">Todos</span>
                </div>
            </nav>

            <main className="content px-6 py-6">
                <TodoList list={todos} setDone={setDone} del={del}/>
                <TodoAdd add={add}/>
            </main>
        </div>
    )
}