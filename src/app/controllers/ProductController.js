import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/user.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(request.userId);
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const { admin: isAdmin } = user;
    if (!isAdmin) {
      return response
        .status(401)
        .json({ error: 'User is not an administrator' });
    }

    const { filename: path } = request.file || {};
    const { name, price, category_id, offer } = request.body;

    // Verificar se a categoria existe antes de criar o produto
    const categoryExists = await Category.findByPk(category_id);
    if (!categoryExists) {
      return response.status(400).json({ error: 'Category not found' });
    }

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return response.status(201).json(product);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(request.userId);
    if (!user) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { admin: isAdmin } = user;
    if (!isAdmin) {
      return response
        .status(401)
        .json({ error: 'User is not an administrator' });
    }

    const { id } = request.params;
    const findProduct = await Product.findByPk(id);
    if (!findProduct) {
      return response
        .status(400)
        .json({ error: 'Make sure product ID is correct' });
    }

    const { filename: path } = request.file || {};
    const { name, price, category_id, offer } = request.body;

    // Verificar se a categoria existe
    const categoryExists = await Category.findByPk(category_id);
    if (category_id && !categoryExists) {
      return response.status(400).json({ error: 'Category not found' });
    }

    await Product.update(
      { name, price, category_id, offer, path },
      { where: { id } },
    );

    const updatedProduct = await Product.findByPk(id);
    return response.status(200).json(updatedProduct);
  }

  async index(request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name', 'id'],
        },
      ],
    });

    return response.json(products);
  }
}

export default new ProductController();
