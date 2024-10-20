/**
 * Componente TextFormat para mostrar el texto con saltos de línea respetados.
 * No altera la estética del textarea u otros componentes.
 */
const TextFormat = ({ text }) => {
    return <div className="whitespace-pre-line">{text}</div>;
};

export default TextFormat;
