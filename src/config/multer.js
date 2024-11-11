import multer from 'multer'; // Importa o multer, que é uma biblioteca usada para lidar com uploads de arquivos em aplicações Node.js.
import { dirname, resolve } from 'path'; // Importa dirname e resolve da biblioteca path. dirname obtém o diretório atual, enquanto resolve ajuda a definir o caminho do diretório onde os arquivos serão salvos.
import { fileURLToPath } from 'url'; // Importa fileURLToPath do módulo url, que converte URLs de arquivos em caminhos do sistema.

const __dirname = dirname(fileURLToPath(import.meta.url)); // Obtém o diretório atual do arquivo em execução, garantindo a resolução correta de caminhos.

export default {
    storage: multer.diskStorage({ // Exporta um objeto de configuração que define como o multer deve salvar os arquivos. multer.diskStorage especifica que os arquivos devem ser salvos no disco, ou seja, no sistema de arquivos local.
        destination: resolve(__dirname, '..', '..', 'uploads'), // Define o diretório onde os arquivos serão salvos, que, neste caso, é a pasta uploads, localizada duas pastas acima do diretório atual (__dirname).
        
        filename: (req, file, cb) => { // Define uma função para gerar o nome do arquivo antes de armazená-lo. Recebe três parâmetros: req (request), file (o arquivo enviado) e cb (callback).
            cb(null, `${Date.now()}-${file.originalname}`); // A função callback renomeia o arquivo ao armazená-lo. Usa o timestamp atual e o nome original do arquivo, garantindo que cada upload tenha um nome único.
        },
    }),
};

// Se você decidir utilizar um UUID para nomear os arquivos, você pode fazer as seguintes alterações:
// 1. Descomente a importação do uuid e extname.
// 2. Use o UUID gerado junto com a extensão do arquivo original para garantir um nome de arquivo único.

// import { extname } from 'path'; // Para extrair a extensão do arquivo.
// import { v4 as uuidv4 } from 'uuid'; // Importa a função v4 da biblioteca uuid para gerar um identificador único (UUID v4).

// Para usar UUID e extensão:
// filename: (req, file, cb) => {
//     cb(null, `${uuidv4()}${extname(file.originalname)}`); // Renomeia o arquivo com um UUID único e a extensão do arquivo original.
