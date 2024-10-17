module.exports = {
  dialect: 'postgres', // ou 'mysql' se estiver usando MySQL
  host: 'localhost',
  port: 5432, // a porta correta para o seu banco de dados
  username: 'postgres', // ou seu nome de usuário
  password: '22082005', // sua senha
  database: 'postgres', // o nome do seu banco de dados
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
