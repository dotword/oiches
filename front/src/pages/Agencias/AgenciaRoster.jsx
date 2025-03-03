import { motion } from 'framer-motion';
import Header from '../../components/Header.jsx';
import AgenciaGruposList from '../../components/Agencias/AgenciaGruposList.jsx';
import Footer from '../../components/Footer.jsx';
import { useLocation } from 'react-router-dom';

const AgenciaRoster = () => {
    const location = useLocation();
    const { userOwner, entries } = location.state || {};

    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Roster" />
                <main className="p-4 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200 md:px-24">
                    <AgenciaGruposList
                        userOwner={userOwner}
                        entries={entries}
                    />
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default AgenciaRoster;
