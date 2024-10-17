import { Router } from 'express'; // Importa o Router do Express

const routes = new Router();

routes.get('/', (request, response) => {
    return response.status(200).json({ message: 'Hello World' }); // Resposta JSON
});

// Exporta o roteador
export default routes;
