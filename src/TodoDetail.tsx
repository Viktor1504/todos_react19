import {useLoaderData} from "react-router";
import {TodoListType} from "./api.ts";

export const TodoDetail = () => {
    const todo = useLoaderData<TodoListType>()
    return (
        <section>
            {todo.done &&
                <p className={'has-text-success'}>
                    Выполнено
                </p>
            }
            <h1>{todo.title}</h1>
            <p>{todo.createdAt} </p>
            {todo.desc && <p>{todo.desc}</p>}
            {todo.image && <p><img src={todo.image} alt={'Иллюстрация'}/></p>}
        </section>
    )
}