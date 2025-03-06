import {TodoListType} from "./Todos.tsx";

export const TodoList = ({list, setDone, del}: {
                             list: TodoListType[],
                             setDone: (key: number) => void,
                             del: (key: number
                             ) => void
                         }
    ) => {


        return (
            <section>
                <h1>Дeлa</h1>
                <table className="table is-hoverable is-fullwidth">
                    <tbody>
                    {list.map((item) => (
                        <tr key={item.key}>
                            <td>
                                {item.done ? <del>{item.title}</del> : item.title}
                            </td>
                            <td>
                                <button className="button is-success" title="Выполнено" disabled={item.done}
                                        onClick={() => setDone(item.key)}>
                                    &#x2713;
                                </button>
                            </td>
                            <td>
                                <button className="button is-danger" title="Удалить"
                                        onClick={() => del(item.key)}>&#9746;</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        );
    }
;