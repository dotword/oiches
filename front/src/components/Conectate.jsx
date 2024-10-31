// Importando imágenes locales
import { Link } from 'react-router-dom';
import img1 from '../assets/Bajo.jpg';
import img2 from '../assets/Oiches_conectamos.jpg';
import img3 from '../assets/Oiches_salas_publico.jpg';
import img4 from '../assets/Oiches_escenario.jpg';
import img5 from '../assets/Guitarras.jpeg';
import img6 from '../assets/Guitarra_bar.jpeg';

const Conectate = () => {
    return (
        <>
            <div className="flex-1 flex flex-col justify-start items-start gap-8">
                <div className="flex flex-col justify-start items-start gap-4 w-full">
                    <h2 className="text-3xl font-bold md:text-4xl md:mb-6">
                        Conéctate con la música en vivo
                    </h2>
                    <p className="text-gray-500 text-lg font-normal">
                        Oiches te ofrece una plataforma para que locales y
                        músicos se encuentren y colaboren.
                    </p>
                </div>
                {/* Botón "Únete hoy" con el estilo del resto de los botones */}
                <Link
                    to="/register"
                    className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded"
                >
                    Únete hoy
                </Link>
            </div>

            {/* Columna derecha: Imágenes en cuadrícula con 2 columnas en móviles y 3 en pantallas más grandes */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[img1, img2, img3, img4, img5, img6].map((image, index) => (
                    <div
                        key={index}
                        className="w-full h-44 rounded-3xl overflow-hidden flex justify-center items-center"
                    >
                        <img
                            className="w-full h-full object-cover rounded-3xl"
                            src={image}
                            alt={`Imagen ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Conectate;
