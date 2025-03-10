import {Link} from "react-router";

export const Error404 = () => {
    return (
        <section>
            <h1>Дело не существует</h1>
            <p>
                Вернитесь на <Link to="/">перечень дeл</Link> и
                выберите какое-либо другое.
            </p>
        </section>
    )
}
