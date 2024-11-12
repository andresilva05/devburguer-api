import * as Yup from 'yup';
import Category from '../models/Category.js';
import User from '../models/User.js';

class CategoryController {
  async store(request, response) {
    // Definindo o esquema de validação com Yup
    const schema = Yup.object({
      name: Yup.string().required('The category name is required'),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { filename: path } = request.file;
    const { name } = request.body;

    // Verifica se a categoria já existe no banco de dados
    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists.' });
    }

    const { id } = await Category.create({
      name,
      path,
    });
    return response.status(201).json({ id, name });
  }

  async update(request, response) {
    // Definindo o esquema de validação com Yup
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(request.userId);
    const { admin: isAdmin } = user || {};

    if (!isAdmin) {
      return response.status(401).json({ error: 'User is not an administrator' });
    }

    const { id } = request.params;
    const categoryExists = await Category.findByPk(id);

    if (!categoryExists) {
      return response
        .status(400)
        .json({ message: 'Make sure the category ID is correct' });
    }

    let path;
    if (request.file) {
      path = request.file.filename;
    }

    const { name } = request.body;

    if (name) {
      const categoryNameExists = await Category.findOne({
        where: {
          name,
        },
      });
      if (categoryNameExists && categoryNameExists.id !== Number(id)) {
        return response.status(400).json({ error: 'Category already exists.' });
      }
    }

    await Category.update(
      {
        name,
        path,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedCategory = await Category.findByPk(id);
    return response.status(200).json(updatedCategory);
  }

  async index(request, response) {
    try {
      const categories = await Category.findAll();
      return response.json(categories);
    } catch (err) {
      return response
        .status(500)
        .json({ error: 'Failed to retrieve categories, please try again.' });
    }
  }
}

export default new CategoryController();
