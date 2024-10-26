import Sequelize, { Model } from "sequelize"; // Importa Sequelize e Model da biblioteca sequelize.

class Product extends Model {
    static init(sequelize) { // Método init deve ser estático e receber a instância do sequelize.
        super.init(
            {
                name: Sequelize.STRING, // Define o campo 'name' como uma string.
                price: Sequelize.DECIMAL(10, 2), // Define o campo 'price' como um decimal com até 10 dígitos, sendo 2 após a vírgula.
                category: Sequelize.STRING, // Define o campo 'category' como uma string.
                path: Sequelize.STRING, // Define o campo 'path' como uma string.
                url: {
                    type: Sequelize.VIRTUAL, // Define o campo 'url' como virtual.
                    get() {
                        return `http://localhost:3001/product-file/${this.path}`; // Retorna a URL completa.
                    }
                }
            },
            {
                sequelize, // Passa a instância do sequelize para a superclasse.
            }
        );
    }
}

export default Product; // Exporta a classe Product para ser utilizada em outros módulos.
