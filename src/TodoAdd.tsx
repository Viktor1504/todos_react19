import {ChangeEvent, FormEvent, useState} from "react";
import {TodoListType} from "./Todos.tsx";
import {useNavigate} from "react-router";
import {Path} from "./router.tsx";

export const TodoAdd = ({add}: { add: (deed: TodoListType) => void }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate()

    const handleImageChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const cFiles = evt.currentTarget.files;
        if (cFiles && cFiles.length > 0) {
            const fileReader = new FileReader();
            if (fileReader.result !== null) {
                setImage(fileReader.result as string);
            }
            fileReader.readAsDataURL(cFiles[0])
        } else {
            setImage('')
        }
    }

    const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        const newDeed: TodoListType = {title, desc, image, done: false, createdAt: '', key: 0}
        const date = new Date();
        newDeed.createdAt = date.toLocaleString();
        newDeed.key = date.getTime()
        add(newDeed);
        (evt.currentTarget as HTMLFormElement)?.reset()
        navigate(Path.Main)
    }

    const handleFormReset = () => {
        setTitle('');
        setDesc('');
        setImage('');
    }

    return (
        <section>
            <h1>Создание нового дела</h1>
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
                <div className="field">
                    <label className="label">Заголовок</label>
                    <div className="control">
                        <input className="input" value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Примечание</label>
                    <div className="control">
                        <textarea className="textarea" value={desc} onChange={e => setDesc(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="field">
                    <div className="file">
                        <label className="file-label">
                            <input className="file-input" type="file" accept="image/*" onChange={handleImageChange}/>
                            <span className="file-cta">
                                       <span className="file-label">
                                       Графическая иллюстрация ...
                                       </span>
                                       </span>
                        </label>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <input type="reset" className="button is-warning is-light" value="Cбpoc"/>
                    </div>
                    <div className="control">
                        <input type="submit" className="button is-primary" value={'Создать дело'}/>
                    </div>

                </div>
            </form>

        </section>
    );
};