export type TodoListType = {
    title: string,
    desc: string,
    image: string,
    done: boolean,
    createdAt: string,
    key: number
}

const date1 = new Date(2024, 6, 18, 10, 24);
const date2 = new Date(2024, 6, 19, 14, 47);

export const todos: TodoListType[] = [
    {
        title: 'Изучить React',
        desc: 'Да поскорее',
        image: '',
        done: true,
        createdAt: date1.toLocaleString(),
        key: date1.getTime()
    },
    {
        title: 'Написать первое React-приложение',
        desc: 'Список запланированных дел',
        image: '',
        done: false,
        createdAt: date2.toLocaleString(),
        key: date2.getTime()
    }
]
