import { Route, Routes,useLocation } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import GrupoDetail from './GrupoDetail.jsx'
import {AnimatePresence} from "framer-motion"
import { LoginPage } from '../pages/Login.jsx'
import { RegisterPage } from '../pages/Register.jsx'
import { RecuperarPassword } from '../pages/RecuperarPassword.jsx'
import { CreacionModifciacionSala } from '../pages/Creacion-ModifciacionSala.jsx'
import UserValidationPage from '../pages/UserValidationPage.jsx'
import {Salas} from "../pages/Salas.jsx"

export const AnimatedRoutes = () => {
  return (
    <AnimatePresence>
    <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/grupos/:idGrupo" element={<GrupoDetail />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/users/validate/:registrationCode"
                    element={<UserValidationPage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/recover-password"
                    element={<RecuperarPassword />}
                />
                <Route
                    path="/creacionmodifciacionsala"
                    element={<CreacionModifciacionSala />}
                />
                <Route
                    path="/salas"
                    element={<Salas />}
                />
            </Routes>
    </AnimatePresence>
  )
}
