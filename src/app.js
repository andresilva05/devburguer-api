import express from 'express'; // Importa o Express
import routes from './routes.js'; // Importa suas rotas

import './database';
class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json()); // Configura o middleware para JSON
  }

  routes() {
    this.app.use('/', routes); // Usa as rotas importadas
  }

  // Método para iniciar o servidor
  listen(port, callback) {
    this.app.listen(port, callback);
  }
}

export default new App().app; // Exporta uma instância da classe App
