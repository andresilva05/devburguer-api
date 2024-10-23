// Importa o Router do Express, que é uma funcionalidade para definir rotas na aplicação.
import { Router } from 'express';

// Importa o UserController, onde está o método para criar um novo usuário.
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';

// Cria uma nova instância do Router, que será usada para definir as rotas da aplicação.
const routes = new Router();

// Define uma rota POST para o endpoint '/users'. Quando o cliente fizer uma requisição POST para '/users',
// o método 'store' do UserController será chamado. Esse método, geralmente, será responsável por criar
// um novo usuário no sistema.
routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);


// Exporta o objeto 'routes' para que possa ser utilizado em outros arquivos, como no arquivo principal da aplicação.
// Esse 'routes' contém todas as rotas definidas até agora.
export default routes;
