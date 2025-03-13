import {LoaderFunctionArgs, redirect} from "react-router";
import {TodoListType, todos} from "./todos.ts";
import {
    AuthError,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    User,
    signOut
} from 'firebase/auth';
import firebaseApp from "./firebase.ts";


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
        return undefined;
    }
    const index = todos.findIndex((item) => item.key === +key);

    if (index === -1) {
        return undefined;
    }

    if (args.request.method === 'PATCH') {
        todos[index].done = true;
    } else if (args.request.method === 'DELETE') {
        todos.splice(index, 1);
    }

    return redirect('/');
};

const auth = getAuth(firebaseApp)

export const register = async ({request}: { request: LoaderFunctionArgs['request'] }) => {
    const fd = await request.formData();
    const email = String(fd.get('email'))
    const password = String(fd.get('password'))

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return redirect('/');
    } catch (err) {
        const error = err as AuthError
        return error.code
    }
};

export const setStateChangeHandler = (func: (user: User | null) => void) => {
    return onAuthStateChanged(auth, func)
}

export const login = async ({request}: { request: LoaderFunctionArgs['request'] }) => {
    const fd = await request.formData()
    try {
        await signInWithEmailAndPassword(auth, String(fd.get('email')), String(fd.get('password')))
        return redirect('/')
    } catch (err) {
        const error = err as AuthError
        return error.code
    }
}

export const logout = async () => {
    await signOut(auth)
    return redirect('/login')
}