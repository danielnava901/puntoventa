import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router";
import './index.css'
import PuntoRouter from "./PuntoRouter.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
            <PuntoRouter />
        </BrowserRouter>
  </StrictMode>,
)
