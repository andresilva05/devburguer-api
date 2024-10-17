export default {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '22082005',
    database: 'devburguer',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: console.log,
  };
  