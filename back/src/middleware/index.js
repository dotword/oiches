// AQUI VAN LOS MIDDLEWARES
'use strict';

// const staticFilesMiddleware = require('./staticFiles');

// module.exports = (app) => {
//     // Usar el middleware para archivos estáticos
//     staticFilesMiddleware(app);
// };

const staticFilesMiddleware = require('./staticFiles');

module.exports = (app) => {
    // Usar el middleware para archivos estáticos
    staticFilesMiddleware(app);
};
