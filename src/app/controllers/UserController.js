import { v4 } from 'uuid'; // Importa a função v4 da biblioteca uuid para gerar IDs únicos.
import * as Yup from 'yup'; // Importa a biblioteca Yup para validação de dados.
import User from '../models/user.js'; // Importa o modelo User, que representa a entidade de usuário. A extensão .js é necessária.

class UserController {
  async store(request, response) {
    // Método assíncrono para armazenar um novo usuário.

    // Define o esquema de validação usando Yup.
    const schema = Yup.object({
      name: Yup.string().required(), // O nome deve ser uma string e é obrigatório.
      email: Yup.string().email().required(), // O email deve ser uma string no formato de email e é obrigatório.
      password: Yup.string().min(6).required(), // A senha deve ser uma string com no mínimo 6 caracteres e é obrigatória.
      admin: Yup.boolean(), // O campo admin deve ser um booleano (opcional).
    });

    try {
      // Valida o corpo da requisição de acordo com o esquema definido.
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      // Se ocorrer um erro de validação, retorna um status 400 com os erros.
      return response.status(400).json({ error: err.errors });
    }

    // Desestrutura os dados do corpo da requisição.
    const { name, email, password, admin } = request.body;

    // Verifica se o email já está em uso.
    const userExist = await User.findOne({
      where: {
        email,
      },
    });

    if (userExist) {
      return response.status(400).json({ error: 'Email já existe' });
    }

    try {
      // Cria um novo usuário.
      const user = await User.create({
        id: v4(),
        name,
        email,
        password,
        admin,
      });

      // Retorna o usuário criado com status 201 (Criado).
      return response.status(201).json({
        id: user.id,
        name,
        email,
        admin,
      });
    } catch (error) {
      // Se ocorrer um erro ao criar o usuário, loga o erro no console e retorna um status 500.
      console.error('Erro ao criar usuário:', error);
      return response.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
}

export default new UserController(); // Exporta uma nova instância do UserController.
