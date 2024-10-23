const path = require('path');

module.exports = {
  'config': path.resolve(__dirname, 'src', 'config', 'database.cjs'), // Alterar se for cjs
  'models-path': path.resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path': path.resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': path.resolve(__dirname, 'src', 'database', 'seeders'),
};
