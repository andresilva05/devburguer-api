import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../schemas/Order.js';

class OrderController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required('Products are required.')
        .of(
          Yup.object().shape({
            id: Yup.number().required('Product ID is required.'),
            quantity: Yup.number().required('Quantity is required.'),
          }),
        ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: err.inner.map((e) => e.message) });
    }

    const { products } = request.body;
    const productsIds = products.map((product) => product.id);

    // Buscar produtos no banco, incluindo a categoria
    const findProducts = await Product.findAll({
      where: { id: productsIds },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    // Verificar se todos os produtos foram encontrados
    if (findProducts.length !== products.length) {
      const foundIds = findProducts.map((product) => product.id);
      const missingIds = productsIds.filter((id) => !foundIds.includes(id));
      return response
        .status(404)
        .json({ error: `Some products not found: ${missingIds.join(', ')}` });
    }

    // Formatar os produtos encontrados, incluindo a quantidade
    const formattedProducts = findProducts.map((product) => {
      const productQuantity =
        products.find((p) => p.id === product.id)?.quantity || 1;

      return {
        id: product.id,
        name: product.name,
        category: product.category.name,
        price: product.price,
        url: `${process.env.BASE_URL || 'http://localhost:3001'}/product-file/${product.path}`,
        quantity: productQuantity,
      };
    });

    // Criação do pedido com os produtos formatados
    const orderData = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: formattedProducts,
      status: 'Pedido Realizado',
    };

    const order = await Order.create(orderData);
    return response.status(201).json(order);
  }

  async index(request, response) {
    const orders = await Order.find();
    return response.status(200).json(orders);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      status: Yup.string().required('Status is required.'),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: err.inner.map((e) => e.message) });
    }

    const { id } = request.params;
    const { status } = request.body;

    try {
      // Atualiza o pedido no banco de dados
      await Order.updateOne({ _id: id }, { status });
      return response
        .status(200)
        .json({ message: 'Pedido atualizado com sucesso!' });
    } catch (err) {
      return response
        .status(500)
        .json({ error: 'Erro ao atualizar o pedido.' });
    }
  }
}

export default new OrderController();
