export const ConfirmationModal = ({
    isOpen,
    onConfirm,
    text,
    onCancel,
    fecha,
    classCancel,
    textCancel = 'Cancelar',
    classConfirm,
    textConfirm = 'Confirmar',
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-4/5 max-w-700">
                <p>{text}</p>
                <p>{fecha}</p>
                <div className="mt-4 flex gap-6 justify-end">
                    <button
                        className={`button p-2 ${classCancel}`}
                        onClick={onCancel}
                    >
                        {textCancel}
                    </button>
                    <button
                        className={`button p-2 ${classConfirm}`}
                        onClick={onConfirm}
                    >
                        {textConfirm}
                    </button>
                </div>
            </div>
        </div>
    );
};
