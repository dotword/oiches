import { LuTicket } from 'react-icons/lu';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';
import { PiCityLight } from 'react-icons/pi';

const TarjetaEvento = ({
    fecha = '--',
    mes = '--',
    anio = '--',
    titulo = 'Evento no disponible',
    lugar = 'Lugar desconocido',
    precio = 'No disponible',
    hora = '--:--',
    ciudad = 'Ciudad no especificada',
    provincia = 'Provincia no especificada',
    link = '#',
}) => {
    return (
        <div className="flex flex-col sm:flex-row w-11/12 mx-auto h-full justify-start items-stretch">
            {/* Columna de la fecha */}
            <div className="w-full sm:w-auto p-6 bg-gray-800 rounded-t-lg sm:rounded-lg flex flex-col justify-center items-center">
                <div className="text-center  text-white text-6xl font-semibold leading-8">
                    {fecha}
                </div>
                <div className="text-center text-white text-lg font-semibold leading-8 mt-2">
                    {mes}
                </div>
                <div className="text-center text-white text-lg font-semibold leading-8">
                    {anio}
                </div>
            </div>

            {/* Información del evento */}
            <div className="flex-grow p-6 bg-white rounded-b-lg sm:rounded-lg overflow-hidden border border-gray-300 flex flex-col gap-2">
                {/* Información textual */}
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                    {/* Título del evento */}
                    <div className="text-gray-900 text-xl font-extrabold">
                        {titulo}
                    </div>

                    {/* Información adicional en dos columnas */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 w-full">
                        {/* Lugar */}
                        <div className="flex items-center">
                            <LuTicket className="inline-block stroke-purple-600 mr-1" />
                            <span className="text-gray-700 text-sm">
                                {lugar}
                            </span>
                        </div>

                        {/* Precio */}
                        <div className="flex items-center">
                            <FaRegMoneyBillAlt className="inline-block fill-purple-600 mr-1" />
                            <span className="text-gray-700 text-sm">
                                {precio}
                            </span>
                        </div>

                        {/* Hora */}
                        <div className="flex items-center">
                            <IoTimeOutline className="inline-block stroke-purple-600 mr-1" />
                            <span className="text-gray-700 text-sm">
                                {hora}
                            </span>
                        </div>

                        {/* Ciudad */}
                        <div className="flex items-center">
                            <PiCityLight className="inline-block fill-purple-600 mr-1" />
                            <span className="text-gray-700 text-sm">
                                {ciudad}, {provincia}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Botón */}
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 mt-4 w-full sm:w-auto bg-purple-600 rounded-lg text-center text-white text-base font-medium hover:bg-purple-700"
                >
                    Ver Evento
                </a>
            </div>
        </div>
    );
};

export default TarjetaEvento;
