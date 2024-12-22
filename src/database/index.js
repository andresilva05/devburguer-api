import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import configDatabase from '../config/dataBase';

require('dotenv').config(); // Carregar variáveis de ambiente

import User from '../app/models/User';
import Product from '../app/models/Product';
import Category from '../app/models/Category';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }

  mongo() {
    const mongoUri =
      process.env.MONGO_URI || 'mongodb://localhost:27017/devburger';
    this.mongoConnection = mongoose
      .connect(mongoUri)
      .then(() => console.log('MongoDB conectado com sucesso!'))
      .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));
  }
}

export default new Database();
