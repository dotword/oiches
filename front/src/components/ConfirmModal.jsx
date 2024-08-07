export const ConfirmationModal = ({
    isOpen,
    onConfirm,
    text,
    onCancel,
    horaInicio,
    horaFinal,
    fecha,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-4/5 max-w-700">
                <h3 className="text-lg">Confirmación</h3>
                <p>{text}</p>
                <p>{horaInicio}</p>
                <p>{horaFinal}</p>
                <p>{fecha}</p>
                <div className="mt-4 flex gap-6 justify-end">
                    <button className="button p-2" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="button p-2 bg-red-600" onClick={onConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};
