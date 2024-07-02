// AQUI VAN LOS MIDDLEWARES
'use strict';
// AQUI VAN LOS MIDDLEWARES
'use strict';

// Importar el middleware para archivos estáticos
import staticFilesMiddleware from './staticFiles.js';

// Exportar como una función que toma `app` como argumento
export default function (app) {
    // Usar el middleware para archivos estáticos
    staticFilesMiddleware(app);
}
