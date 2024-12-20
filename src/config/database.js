require('dotenv').config(); // Certifique-se de carregar as variáveis de ambiente

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres', // Banco padrão 'postgres'
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'devburguer',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
