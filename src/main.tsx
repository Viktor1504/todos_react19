import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'bulma/css/bulma.css'
import {RouterProvider} from "react-router/dom";
import {router} from "./router.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)