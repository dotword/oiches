import { useState } from 'react';

export const ConfirmationModal = ({ isOpen, onConfirm, onCancel,horaInicio,horaFinal,fecha }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h3 className="text-lg">Confirmación</h3>
        <p>¿Estás seguro de que quieres enviar esta reserva?</p>
        <p>{horaInicio}</p>
        <p>{horaFinal}</p>
        <p>{fecha}</p>
        <div className="mt-4 flex gap-6 justify-end">
          <button className="button p-2" onClick={onCancel}>Cancelar</button>
          <button className="button p-2" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};


