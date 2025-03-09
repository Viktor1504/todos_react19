import {LoaderFunctionArgs, redirect} from "react-router";
import {TodoListType, todos} from "./todos.ts";

export const getTodos = (): TodoListType[] => {
    return todos
}

export const addTodo = async ({request}: { request: Request }) => {
    const fd = await request.formData()
    const date = new Date();
    const newTodo = {
        title: String(fd.get('title')),
        desc: String(fd.get('desc')),
        image: String(fd.get('image')),
        done: false,
        createdAt: date.toLocaleString(),
        key: date.getTime()
    }
    todos.push(newTodo)
    return redirect('/')
}

export const getTodo = ({params}: LoaderFunctionArgs): TodoListType | undefined => {
    if (!params || !params.key) {
        return undefined
    }
    const key = +params.key;
    return todos.find((item) => item.key === key);
};