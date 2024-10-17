module.exports = {
  env: {
    browser: true, // Define que o código pode ser executado em um navegador
    es2021: true,  // Define a versão do ECMAScript
    node: true,    // Define que o código pode ser executado no Node.js
  },
  extends: [
    'airbnb-base', // Extensão de estilo do Airbnb
    'plugin:prettier/recommended', // Integração com Prettier
  ],
  plugins: [
    'prettier',    // Plugin do Prettier
  ],
  parserOptions: {
    ecmaVersion: 12, // Define a versão do ECMAScript
    sourceType: 'module', // Permite o uso de módulos ES
  },
  rules: {
    'prettier/prettier': 'error', // Exibe erros de estilo do Prettier como erros do ESLint
    indent: ['error', 2], // Define indentação de 2 espaços
    'linebreak-style': ['error', 'unix'], // Usa estilo de quebra de linha Unix
    quotes: ['error', 'single'], // Usa aspas simples
    semi: ['error', 'always'], // Exige ponto e vírgula no final das declarações
    'no-console': 'warn', // Aviso para uso de console
  },
};
