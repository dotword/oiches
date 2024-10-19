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
        <div className="w-full h-full px-6 bg-white flex flex-col justify-center items-center">
            {/* Ajustamos el padding superior e inferior según el tamaño de la pantalla */}
            <div className="w-full py-12 md:py-28 bg-white flex flex-col md:flex-row justify-between items-center gap-16 max-w-6xl mx-auto">
                {/* Columna izquierda: Título, descripción y botón */}
                <div className="flex-1 flex flex-col justify-start items-start gap-8">
                    <div className="flex flex-col justify-start items-start gap-4 w-full">
                        <h1 className="text-gray-900 text-4xl md:text-5xl font-extrabold leading-tight">
                            Conéctate con la música en vivo
                        </h1>
                        <p className="text-gray-500 text-lg font-normal">
                            Oiches te ofrece una plataforma para que locales y
                            músicos se encuentren y colaboren.
                        </p>
                    </div>
                    {/* Botón "Únete hoy" con el estilo del resto de los botones */}
                    <Link
                        to="/register"
                        className="bg-purpleClaro hover:bg-orange-500 text-white font-bold py-2 px-6 rounded cursor-pointer"
                    >
                        Únete hoy
                    </Link>
                </div>

                {/* Columna derecha: Imágenes en cuadrícula con 2 columnas en móviles y 3 en pantallas más grandes */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[img1, img2, img3, img4, img5, img6].map(
                        (image, index) => (
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
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Conectate;
