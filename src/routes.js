import { Router } from 'express'; // Importa o Router do Express
import User from './app/models/User.js'; // Importa o modelo User

import { v4 } from 'uuid';

const routes = new Router();

// Rota para criar um novo usuário
routes.post('/', async (request, response) => {
  try {
    // Cria um novo usuário sem atribuir ID manualmente
    const user = await User.create({
      id: v4(),
      name: 'Augustinho',
      email: 'augustinho@email.com',
      password_hash: '123456',
    });
    return response.status(201).json(user); // Retorna o usuário criado
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return response.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Exporta o roteador
export default routes;
