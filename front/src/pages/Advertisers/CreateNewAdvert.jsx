// import { motion } from 'framer-motion';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import AdvertNewCreation from '../../components/Advertisers/AdvertNewCreation';

// const CreateNewAdvert = () => {
//     return (
//         <>
//             <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: '100%' }}
//                 exit={{ opacity: 0, height: 0 }}
//             >
//                 <Header txt="Crear un nuevo anuncio" />
//                 <main className="w-11/12 mx-auto my-6 md:max-w-7xl bg-gray-900">
//                     <div className=" bg-gray-900 p-6 rounded-lg shadow-md flex flex-col">
//                         <AdvertNewCreation />
//                     </div>
//                 </main>
//                 <Footer />
//             </motion.div>
//         </>
//     );
// };
// export default CreateNewAdvert;

import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdvertNewCreation from '../../components/Advertisers/AdvertNewCreation';

const CreateNewAdvert = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header/>
                <main className="w-full mx-auto  md:max-w-1xl">
                    <div className="bg-custom-gradient p-1 sm:p-6 shadow-md flex flex-col">   
                        <AdvertNewCreation />
                    </div>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default CreateNewAdvert;
