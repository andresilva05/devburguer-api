import * as Yup from 'yup'; // Importa a biblioteca Yup para validação de dados
import Product from '../models/Product.js'; // Importa o modelo Product (ajuste o caminho conforme necessário)

// Define a classe ProductController
class ProductController {
    // Método assíncrono que será responsável por criar um novo produto
    async store(request, response) {
        // Cria um esquema de validação para os dados do produto
        const schema = Yup.object({
            name: Yup.string().required(),    // 'name' deve ser uma string e é obrigatório
            price: Yup.number().required(),   // 'price' deve ser um número e é obrigatório
            category: Yup.string().required() // 'category' deve ser uma string e é obrigatório
        });

        try {
            // Valida o corpo da requisição usando o esquema definido
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            // Em caso de erro na validação, retorna uma resposta com status 400 (Bad Request)
            return response.status(400).json({ error: err.errors });
        }

        const { filename: path } = request.file; // Obtém o nome do arquivo enviado
        const { name, price, category } = request.body; // Desestrutura os dados do corpo da requisição

        // Cria o produto no banco de dados
        const product = await Product.create({ name, price, category, path });

        // Se a validação for bem-sucedida, retorna uma resposta com status 201 (Created)
        return response.status(201).json({ product });
    }

    async index(request, response) {
        const products = await Product.findAll();
        
        // Retorna a lista de produtos como resposta
        return response.json(products);
    }
}

// Exporta uma nova instância de ProductController para que possa ser usada em outros módulos
export default new ProductController();
