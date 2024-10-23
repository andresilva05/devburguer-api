import Sequelize from 'sequelize';
import User from '../app/models/user.js';
import configDatabase from '../config/database.cjs'; // Certifique-se de que a extensão está correta

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa a conexão com o banco de dados usando a configuração
    this.connection = new Sequelize(configDatabase);

    // Inicializa todos os modelos
    models.map((model) => model.init(this.connection));

    // Sincroniza os modelos com o banco de dados
    this.syncModels();
  }

  // Método para sincronizar os modelos com o banco de dados
  syncModels() {
    this.connection.sync({ alter: true }) // ou { force: true } para recriar tabelas
      .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
      })
      .catch((error) => {
        
        console.error('Erro ao sincronizar modelos com o banco de dados:', error);
      });
  }
}

export default new Database();
