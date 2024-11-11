import mongoose from 'mongoose'; // Certifique-se de importar o mongoose
import Sequelize from 'sequelize';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import User from '../app/models/user.js';
import configDatabase from '../config/database.cjs'; // Verifique a extensão do arquivo de configuração

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // Inicializa a conexão com o banco de dados usando a configuração
    this.connection = new Sequelize(configDatabase);

    // Inicializa todos os modelos e associações
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/devburguer',
    )
  }

  // Método para sincronizar os modelos com o banco de dados
  syncModels() {
    this.connection
      .sync({ alter: true }) // ou { force: true } para recriar tabelas
      .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
      })
      .catch((error) => {
        console.error('Erro ao sincronizar modelos com o banco de dados:', error);
      });
  }
}

export default new Database();
