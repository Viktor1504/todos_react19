import {redirect} from "react-router";
import {todos} from "./Todos.tsx";
import {Path} from "./router.tsx";

export const getTodos = () => {
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
    return redirect(Path.Main)
}