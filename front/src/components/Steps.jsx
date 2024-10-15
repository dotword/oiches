// const Steps = () => {
//     return (
//         <div className="min-h-screen flex justify-center items-center bg-white">
//             <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 md:px-8 gap-8">
//                 {/* Columna izquierda: Ilustración */}
//                 <div className="md:w-1/2 flex justify-center">
//                     {/* Aquí puedes colocar una imagen o una ilustración */}
//                     <img
//                         src="/Steps.jpg"
//                         alt="Como darse de alta en Oiches"
//                         className="w-full h-auto"
//                     />
//                 </div>

//                 {/* Columna derecha: Pasos */}
//                 <div className="md:w-1/2">
//                     <h2 className="text-gray-500 mb-2 text-center md:text-left">
//                         Join easily with just
//                     </h2>
//                     <h1 className="text-5xl font-bold text-purple-600 mb-6 text-center md:text-left">
//                         5 Steps
//                     </h1>

//                     <div className="grid grid-cols-2 gap-6">
//                         {/* Pasos lado izquierdo */}
//                         <div className="flex flex-col gap-4">
//                             {[
//                                 {
//                                     step: 1,
//                                     description:
//                                         'Click "Register", enter email and password',
//                                 },
//                                 {
//                                     step: 2,
//                                     description: 'Verify email with Code',
//                                 },
//                             ].map((step, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-white shadow-md rounded-lg p-4 flex items-start"
//                                 >
//                                     <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4 text-lg font-bold">
//                                         {step.step}
//                                     </div>
//                                     <div>
//                                         <p className="text-gray-500">
//                                             {step.description}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Pasos lado derecho */}
//                         <div className="flex flex-col gap-4">
//                             {[
//                                 {
//                                     step: 3,
//                                     description: 'Verify phone with OTP',
//                                 },
//                                 {
//                                     step: 4,
//                                     description:
//                                         'Yay! You can now start trading!',
//                                 },
//                                 {
//                                     step: 5,
//                                     description:
//                                         'Complete KYC for higher limits',
//                                 },
//                             ].map((step, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-white shadow-md rounded-lg p-4 flex items-start"
//                                 >
//                                     <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4 text-lg font-bold">
//                                         {step.step}
//                                     </div>
//                                     <div>
//                                         <p className="text-gray-500">
//                                             {step.description}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Steps;

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
