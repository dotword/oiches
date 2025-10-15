import { Link } from 'react-router-dom';
import { MdOutlineSaveAlt } from 'react-icons/md';
import { CiLock } from 'react-icons/ci';

const SubmitButton = ({ isLoading, textButton }) => {
    return (
        <>
            {/* Botón de Guardar */}  
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex w-full border-t border-gray-200 ${
                        isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purpleOiches hover:bg-purple-700'
                    } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200  shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-4 focus:ring-purple-200 selection:flex items-center justify-center gap-2`}
                >
                    {isLoading ? (
                        <>
                            <MdOutlineSaveAlt className="w-5 h-5 animate-spin" />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <MdOutlineSaveAlt className="w-5 h-5" />
                            {textButton ? 'Guardar datos' : textButton}
                        </>
                    )}
                </button>

            {/* Nota de privacidad */}
            <div className="text-center">
                <p className="text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-1">
                    <span className="flex items-center gap-1">
                        <CiLock className="text-base" />
                        Datos protegidos según nuestra
                    </span>
                    <Link
                        to="/politica-privacidad"
                        className="text-purpleOiches hover:underline"
                        target="_blank"
                    >
                        política de privacidad
                    </Link>
                </p>
            </div>
        </>
    );
};

export default SubmitButton;
