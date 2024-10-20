import StepsImg from '../assets/Steps.jpg'; // Asegúrate de que la ruta de la imagen sea correcta

const Steps = () => {
    return (
        <div className="w-full h-full mt-20 py-4 px-4 flex justify-center items-center">
            <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 max-w-6xl mx-auto">
                {/* Columna izquierda: Beneficios */}
                <div className="flex flex-col justify-start items-start gap-10 w-full md:w-1/2">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Como darse de alta en Oiches
                    </h2>

                    {/* Pasos para darse de alta */}
                    <div className="bg-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                        <h3 className="text-xl font-normal text-gray-900">
                            Accede a Registro
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Seleciona Artista o Sala (según tu interés), rellena
                            todos los datos.
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                        <h3 className="text-xl font-normal text-gray-900">
                            Confirma tu alta
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Te enviaremos a tu correo un email de Confirmación,
                            copia el código y pégalo en la pantalla de
                            verificación.
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                        <h3 className="text-xl font-normal text-gray-900">
                            Haz login y accede a tu perfil
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Tú decides qué grupos contratar y cuándo, además de
                            evaluar su actuación.
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                        <h3 className="text-xl font-normal text-gray-900">
                            Completa tu perfil
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Rellena todos tus datos de esta forma otras salas o
                            músicos podrán contactar contigo y tú con ellos.
                        </p>
                    </div>
                </div>

                {/* Columna derecha: Imagen */}
                <div className="w-full md:w-1/2 flex justify-center items-stretch">
                    <img
                        src={StepsImg} // Aquí debes colocar la ruta correcta o el import de tu imagen
                        alt="Como darse de alta en Oiches"
                        className="rounded-xl w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Steps;
