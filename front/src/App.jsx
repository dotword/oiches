import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import useAuth from './hooks/useAuth.jsx';
import Home from './pages/Home.jsx';
import { RegisterPage } from './pages/Users/Register.jsx';
import { LoginPage } from './pages/Users/Login.jsx';
import { RecuperarPassword } from './pages/Users/RecuperarPassword.jsx';
import UserValidationPage from './pages/Users/UserValidationPage.jsx';
import Users from './pages/Users/Users.jsx';
import ChangePassword from './pages/Users/ChangePassword.jsx';
import CreacionSala from './pages/Salas/CreacionSala.jsx';
import EdicionSala from './pages/Salas/EdicionSala.jsx';
import { SalaPage } from './pages/Salas/SalaPage.jsx';
import Salas from './pages/Salas/Salas.jsx';
import CreacionGrupo from './pages/Grupos/CreacionGrupo.jsx';
import EdicionGrupo from './pages/Grupos/EdicionGrupo.jsx';
import { GrupoPage } from './pages/Grupos/GrupoPage.jsx';
import Grupos from './pages/Grupos/Grupos.jsx';
import NotFound from './pages/NotFound.jsx';
import { CrearReservaPage } from './pages/Reservas/CrearReservaPage.jsx';
import { ValidateUser } from './pages/Users/ValidateUser.jsx';
import SobreOiches from './pages/SobreOiches.jsx';
import AvisoLegal from './pages/AvisoLegal.jsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad.jsx';
import PoliticaCookies from './pages/PoliticaCookies.jsx';
import CookieConsentBanner from './components/CookieConsentBanner.jsx';
import Maintenance from './components/Maintenance.jsx';
import Contacto from './pages/Contacto.jsx';
import {
    AdminNoticeboard,
    AdminDashboard,
    ReservasDashboard,
} from './pages/Admin/index.jsx';
import CreateConcierto from './pages/conciertos/CreateConcierto.jsx';
import CalendarioSalasPage from './pages/Reservas/CalendariosSalasPage.jsx';
import CalendarioGruposPage from './pages/Reservas/CalendariosGruposPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ConciertoPage from './pages/conciertos/ConciertoPage.jsx';
import EdicionConcierto from './pages/conciertos/EdicionConcierto.jsx';
import Conciertos from './pages/conciertos/Conciertos.jsx';
import AgenciaPage from './pages/Agencias/AgenciaPage.jsx';
import Agencias from './pages/Agencias/Agencias.jsx';
import AgenciaRoster from './pages/Agencias/AgenciaRoster.jsx';
import {
    AdminConcurso,
    SemifinalistasConcurso,
    ConciertoConcurso,
    BasesSorteoEntradas,
} from './pages/Concurso/index.jsx';
import {
    NoticeboardPage,
    CreacionNotice,
    CondicionesNoticeboard,
    NoticeDetail,
    UserNoticeboard,
    EdicionNotice,
} from './pages/Noticeboard/index.jsx';

function App() {
    // Verificar el modo de mantenimiento
    const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
    const { userLogged } = useAuth();

    return (
        <>
            <ScrollToTop />
            {isMaintenanceMode &&
            (!userLogged || userLogged.roles !== 'admin') ? (
                <>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                    <Maintenance />
                </>
            ) : (
                <AnimatePresence>
                    <Routes>
                        {/* Global pages */}
                        <Route path="/" element={<Home />} />
                        <Route path="/sobre-oiches" element={<SobreOiches />} />
                        <Route path="/aviso-legal" element={<AvisoLegal />} />
                        <Route
                            path="/politica-privacidad"
                            element={<PoliticaPrivacidad />}
                        />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route
                            path="/politica-cookies"
                            element={<PoliticaCookies />}
                        />
                        <Route path="*" element={<NotFound />} />

                        {/* USERS */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route
                            path="/users/validate/:registrationCode"
                            element={<UserValidationPage />}
                        />
                        <Route
                            path="/users/password/recover"
                            element={<RecuperarPassword />}
                        />
                        <Route
                            path="/users/password"
                            element={<ChangePassword />}
                        />
                        <Route
                            path="/users/account/:userId"
                            element={<Users />}
                        />
                        <Route
                            path="/validateUser"
                            element={<ValidateUser />}
                        />

                        {/* SALAS */}
                        <Route
                            path="/creacion-sala/:userId"
                            element={<CreacionSala />}
                        />
                        <Route
                            path="/sala/:idSala/edit"
                            element={<EdicionSala />}
                        />
                        <Route path="/salas" element={<Salas />} />
                        <Route path="/sala/:idSala" element={<SalaPage />} />
                        <Route
                            path="/sala/calendar/:idSala"
                            element={<CalendarioSalasPage />}
                        />

                        {/* GRUPOS */}
                        <Route
                            path="/grupo/:idGrupo/edit"
                            element={<EdicionGrupo />}
                        />
                        <Route path="/grupo/:idGrupo" element={<GrupoPage />} />
                        <Route path="/grupos" element={<Grupos />} />
                        <Route
                            path="/creacion-grupo/:userId"
                            element={<CreacionGrupo />}
                        />

                        {/* RESERVAS */}
                        <Route
                            path="/grupo/calendar/:idGrupo"
                            element={<CalendarioGruposPage />}
                        />
                        <Route
                            path="/sala/:idSala/reservas"
                            element={<CrearReservaPage type="sala" />}
                        />
                        <Route
                            path="/grupo/:idGrupo/reservas"
                            element={<CrearReservaPage type="grupo" />}
                        />

                        {/* ADMIN */}
                        <Route
                            path="/admin-dashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin-noticeboard"
                            element={<AdminNoticeboard />}
                        />
                        <Route
                            path="/admin-reservas"
                            element={<ReservasDashboard />}
                        />
                        <Route
                            path="/crear-concierto/:reservaId"
                            element={<CreateConcierto />}
                        />
                        {/* CONCIERTOS */}
                        <Route path="/conciertos" element={<Conciertos />} />
                        <Route
                            path="/concierto/:conciertoId"
                            element={<ConciertoPage />}
                        />
                        <Route
                            path="/concierto/:conciertoId/edit"
                            element={<EdicionConcierto />}
                        />
                        {/* AGENCIA */}
                        <Route
                            path="/agencia/:idAgencia"
                            element={<AgenciaPage />}
                        />
                        <Route path="/agencias" element={<Agencias />} />
                        <Route
                            path="users/roster/:idAgencia"
                            element={<AgenciaRoster />}
                        />
                        {/* CONCURSO */}
                        <Route
                            path="/admin-concurso"
                            element={<AdminConcurso />}
                        />
                        <Route
                            path="/concurso/concierto-oiches"
                            element={<ConciertoConcurso />}
                        />
                        {/* NOTICEBOARD */}
                        <Route
                            path="/noticeboard"
                            element={<NoticeboardPage />}
                        />
                        <Route
                            path="/notice-creacion/:userId"
                            element={<CreacionNotice />}
                        />
                        <Route
                            path="/condiciones-noticeboard"
                            element={<CondicionesNoticeboard />}
                        />
                        <Route
                            path="/noticeboard/:idNotice"
                            element={<NoticeDetail />}
                        />
                        <Route
                            path="/noticeboard/user/:userId"
                            element={<UserNoticeboard />}
                        />
                        <Route
                            path="/noticeboard/:idNotice/edit"
                            element={<EdicionNotice />}
                        />
                        <Route
                            path="/concurso/finalistas"
                            element={<SemifinalistasConcurso />}
                        />
                        <Route
                            path="/bases-sorteo-entradas"
                            element={<BasesSorteoEntradas />}
                        />
                    </Routes>
                </AnimatePresence>
            )}
            <CookieConsentBanner />
        </>
    );
}

export default App;
