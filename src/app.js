import express from 'express'; // Importa o Express
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import './database/index.js'; // Importa e inicializa a conexão com o banco de dados
import routes from './routes.js'; // Importa suas rotas

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class App {
  constructor() {
    this.app = express(); // Inicializa o Express

    this.middlewares(); // Configura os middlewares
    this.routes(); // Configura as rotas
  }

  middlewares() {
    this.app.use(express.json()); // Configura o middleware para JSON
    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads'))); // Corrigido
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
