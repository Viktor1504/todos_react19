import {Link, useLoaderData, useSubmit} from "react-router";
import {TodoListType} from "./todos.ts";

export const TodoList = () => {
        const list = useLoaderData<TodoListType[]>()
        const submit = useSubmit()

        const handleDone = (key: number) => {
            submit(null, {action: `/${key}`, method: 'patch'})
        }

        const handleDelete = (key: number) => {
            submit(null, {action: `/${key}`, method: 'delete'})
        }

        return (
            <section>
                <h1>Дeлa</h1>
                <table className="table is-hoverable is-fullwidth">
                    <tbody>
                    {list.map((item) => (
                        <tr key={item.key}>
                            <td>
                                <Link to={`/${item.key}`}>
                                    {item.done && <del>{item.title}</del>}
                                    {!item.done && item.title}
                                </Link>
                            </td>
                            <td>
                                <button
                                    className="button is-success"
                                    title="Выполнено"
                                    disabled={item.done}
                                    onClick={() => handleDone(item.key)}
                                >
                                    &#x2713;
                                </button>
                            </td>
                            <td>
                                <button
                                    className="button is-danger"
                                    title="Удалить"
                                    onClick={() => handleDelete(item.key)}
                                >
                                    &#9746;
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        );
    }
;