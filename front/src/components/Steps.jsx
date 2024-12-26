import StepsImg from '../assets/Steps.jpg';

const Steps = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 mx-auto">
            {/* Columna izquierda: Beneficios */}
            <div className="flex flex-col justify-start items-start gap-10 w-full md:w-1/2">
                <h2 className="text-3xl font-bold md:text-4xl md:mb-6">
                    Cómo darse de alta en Oiches
                </h2>

                {/* Pasos para darse de alta */}
                <div className="bg-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-normal text-gray-900">
                        Accede al registro
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Selecciona Artista o Sala (según tu interés) y rellena
                        los datos.
                    </p>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-normal text-gray-900">
                        Confirma tu alta
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Te enviaremos un email para verificar tu dirección de
                        correo electrónico.
                    </p>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-normal text-gray-900">
                        Haz login y completa tu perfil
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Completa la información de tu sala o proyecto musical,
                        de esta forma podrás contactar con otras salas o
                        músicos.
                    </p>
                </div>
            </div>

            {/* Columna derecha: Imagen */}
            <div className="md:w-1/2 flex justify-center items-stretch">
                <img
                    src={StepsImg} // Aquí debes colocar la ruta correcta o el import de tu imagen
                    alt="Como darse de alta en Oiches"
                    className="rounded-xl w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Steps;
