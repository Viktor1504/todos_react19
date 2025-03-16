import {LoaderFunctionArgs, redirect} from "react-router";
import {
    AuthError,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth';
import {getDatabase, push, ref, set, query, get, remove} from "firebase/database";
import firebaseApp from "./firebase.ts";

export type TodoListType = {
    key: string
    title: string,
    desc: string,
    image: string,
    done: boolean,
    createdAt: string,
}

type NewTodo = Omit<TodoListType, 'key'>;

export const auth = getAuth(firebaseApp)
const database = getDatabase(firebaseApp)

export const getUserId = () => {
    if (auth.currentUser) {
        return auth.currentUser.uid;
    } else {
        return localStorage.getItem('user-id')
    }
}

export const setStateChangeHandler = (func: (user: User | null) => void) => {
    return onAuthStateChanged(auth, func)
}

export const getTodos = async (): Promise<TodoListType[]> => {
    const currentUserId = getUserId()
    if (!currentUserId) {
        throw redirect('/login')
    }
    const r = ref(database, `users/${currentUserId}/todos`)
    const q = query(r)
    const s = await get(q)
    const res: TodoListType[] = []
    s.forEach(doc => {
        const todo = doc.val() as TodoListType
        todo.key = doc.key
        res.push(todo)
    })
    return res
}

export const getTodo = async ({params}: { params: LoaderFunctionArgs['params'] }): Promise<TodoListType> => {
    const currentUserId = getUserId()
    if (!currentUserId) {
        throw redirect('/login')
    }
    const r = ref(database, `users/${currentUserId}/todos/${params.key}`)
    const q = query(r)
    const s = await get(q)
    if (!s.exists()) throw new Error()
    return s.val()
};

export const addTodo = async ({request}: { request: LoaderFunctionArgs['request'] }) => {
    const currentUserId = getUserId()
    if (!currentUserId) {
        throw redirect('/login')
    }
    const fd = await request.formData()
    const date = new Date();
    const newTodo: NewTodo = {
        title: String(fd.get('title')),
        desc: String(fd.get('desc')),
        image: String(fd.get('image')),
        done: false,
        createdAt: date.toLocaleString(),
    }
    const db = ref(database, `users/${currentUserId}/todos`)
    const r = await push(db)
    await set(r, newTodo)
    return redirect('/')
}

export const actTodo = async (args: LoaderFunctionArgs) => {
    const currentUserId = getUserId()
    if (!currentUserId) {
        throw redirect('/login')
    }
    if (args.request.method === 'PATCH') {
        const r = ref(database, `users/${currentUserId}/todos/${args.params.key}/done`)
        await set(r, true)
    } else if (args.request.method === 'DELETE') {
        const r = ref(database, `users/${currentUserId}/todos/${args.params.key}`)
        await remove(r)
    }
    return redirect('/');
};

export const register = async ({request}: { request: LoaderFunctionArgs['request'] }) => {
    const fd = await request.formData();
    const email = String(fd.get('email'))
    const password = String(fd.get('password'))

    try {
        const cr = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem('user-id', cr.user.uid)
        return redirect('/');
    } catch (err) {
        const error = err as AuthError
        return error.code
    }
};

export const login = async ({request}: { request: LoaderFunctionArgs['request'] }) => {
    const fd = await request.formData()
    try {
        const cr = await signInWithEmailAndPassword(auth, String(fd.get('email')), String(fd.get('password')))
        localStorage.setItem('user-id', cr.user.uid)
        return redirect('/')
    } catch (err) {
        const error = err as AuthError
        return error.code
    }
}

export const logout = async () => {
    await signOut(auth)
    localStorage.removeItem('user-id')
    return redirect('/login')
}

export const onlyLoggedOut = () => {
    if (getUserId())
        return redirect('/');
    else
        return null;
}

export const requireAuth = () => {
    if (!getUserId()) {
        throw redirect('/login');
    }
    return null; // Ничего не возвращаем, если авторизация прошла
}