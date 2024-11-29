import express from 'express'; // Importa o Express
import { resolve } from 'node:path';
import './database'; // Importa e inicializa a conexão com o banco de dados
import routes from './routes.js'; // Importa suas rotas
import cors from 'cors'; // Importa o CORS

class App {
  constructor() {
    this.app = express(); // Inicializa o Express

    this.middlewares(); // Configura os middlewares
    this.routes(); // Configura as rotas
  }

  middlewares() {
    this.app.use(cors()); // Adiciona o middleware CORS
    this.app.use(express.json()); // Configura o middleware para JSON
    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use(routes); // Usa as rotas importadas
  }
}

export default new App().app; // Exporta uma instância da classe App
