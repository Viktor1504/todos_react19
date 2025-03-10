import {LoaderFunctionArgs, redirect} from "react-router";
import {TodoListType, todos} from "./todos.ts";

export const getTodos = (): TodoListType[] => {
    return todos
}

export const addTodo = async ({request}: { request: LoaderFunctionArgs['request'] }) => {
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

export const getTodo = ({params}: { params: LoaderFunctionArgs['params'] }): TodoListType | undefined => {
    const key = params.key;
    if (!key) {
        return undefined;
    }
    const todo = todos.find((item) => item.key === +key)
    if (!todo) {
        throw new Error
    }
    return todo
};

export const actTodo = (args: LoaderFunctionArgs) => {
    const key = args.params.key;
    if (!key) {
        return undefined
    }
    const index = todos.findIndex((item) => item.key === +key)

    if (index === -1) {
        return undefined
    }
    if (args.request.method === 'PATCH') {
        todos[index].done = true
    } else {
        todos.splice(index, 1)
    }
    return redirect('/')
}