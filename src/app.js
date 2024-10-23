import express from 'express'; // Importa o Express
import './database/index.js'; // Importa e inicializa a conexão com o banco de dados
import routes from './routes.js'; // Importa suas rotas

class App {
  constructor() {
    this.app = express(); // Inicializa o Express

    this.middlewares(); // Configura os middlewares
    this.routes(); // Configura as rotas
  }

  middlewares() {
    this.app.use(express.json()); // Configura o middleware para JSON
  }

  routes() {
    this.app.use('/', routes); // Usa as rotas importadas
  }

  // Método para iniciar o servidor
  listen(port, callback) {
    this.app.listen(port, callback); // Inicia o servidor
  }
}

export default new App().app; // Exporta uma instância da classe App
