// Importa o Router do Express, que permite definir rotas para gerenciar requisições na aplicação.
import { Router } from 'express';

// Importa o 'multer' para lidar com uploads de arquivos e a configuração de multer
import multer from 'multer';
import multerConfig from './config/multer.js';

// Importa os controladores (controllers) para manipular as rotas específicas
import ProductController from './app/controllers/ProductController.js'; // Controller para produtos
import SessionController from './app/controllers/SessionController.js'; // Controller para sessões (autenticação, por exemplo)
import UserController from './app/controllers/UserController.js'; // Controller para usuários

// Cria uma nova instância de Router para definir as rotas da aplicação
const routes = new Router();

// Cria uma instância do 'upload' com as configurações definidas em 'multerConfig'
const upload = multer(multerConfig);

// Define uma rota POST para o endpoint '/users' que chama o método 'store' do UserController
// O método 'store' é geralmente responsável pela criação de um novo usuário no sistema
routes.post('/users', UserController.store);

// Define uma rota POST para o endpoint '/session' que chama o método 'store' do SessionController
// O método 'store' será responsável por criar uma nova sessão, como uma autenticação do usuário
routes.post('/session', SessionController.store);

// Define uma rota POST para o endpoint '/products' que chama o método 'store' do ProductController
// O 'upload.single('file')' indica que esta rota aceitará um único arquivo enviado com o nome 'file'
routes.post('/products', upload.single('file'), ProductController.store);

// Define uma rota GET para o endpoint '/products' que chama o método 'index' do ProductController
routes.get('/products', ProductController.index);

// Exporta o objeto 'routes' para ser utilizado em outros arquivos, como o principal da aplicação
// Esse 'routes' contém todas as rotas definidas para a aplicação
export default routes;




// Explicação detalhada de cada parte:
// import { Router } from 'express';
// Importa o módulo Router do Express para definir as rotas da aplicação. O Router organiza e manipula as requisições recebidas para diferentes endpoints.

// import multer from 'multer'; e import multerConfig from './config/multer.js';
// Importa multer, uma biblioteca que permite lidar com uploads de arquivos em uma aplicação Node.js. Também importa uma configuração customizada para o multer, definida no arquivo multerConfig.

// Importações dos Controladores (ProductController, SessionController, UserController)
// Cada controlador é responsável por gerenciar ações específicas para diferentes tipos de dados. Por exemplo, UserController gerencia usuários, SessionController gerencia sessões de autenticação, e ProductController gerencia produtos.

// const routes = new Router();
// Cria uma nova instância de Router, que permite definir várias rotas que serão exportadas no final do arquivo para serem usadas na aplicação.

// const upload = multer(multerConfig);
// Configura o multer com as opções definidas em multerConfig, preparando-o para gerenciar uploads de arquivos.

// routes.post('/users', UserController.store);
// Define uma rota para o endpoint /users que aceita requisições POST. Quando a rota é acessada, o método store de UserController é executado. Geralmente, esse método é responsável por criar um novo usuário.

// routes.post('/session', SessionController.store);
// Define uma rota para o endpoint /session que também aceita requisições POST. O método store de SessionController é chamado para criar uma nova sessão, o que é útil para autenticação.

// routes.post('/products', upload.single('file'), ProductController.store);
// Define uma rota para o endpoint /products que aceita requisições POST e permite upload de um arquivo com o nome file. O arquivo será processado por multer, e o método store de ProductController será executado para criar um novo produto.

// export default routes;
// Exporta o objeto routes, contendo todas as rotas definidas no arquivo. Isso permite que routes seja importado em outros arquivos para que as rotas estejam disponíveis na aplicação.