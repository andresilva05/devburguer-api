import jwt from 'jsonwebtoken' // Importa a biblioteca jsonwebtoken para manipular tokens JWT.
import authConfig from '../../config/auth' // Importa a configuração de autenticação, onde está a chave secreta.

export default function authMiddleware(request, response, next) {
    // Middleware de autenticação que verifica a presença e validade de um token JWT.

    // console.log(request.headers.authorization); 
    // Código comentado para debugar e verificar o header de autorização.

    const authToken = request.headers.authorization;
    // Obtém o cabeçalho de autorização da requisição HTTP.

    if (!authToken) {
        // Se o token não foi enviado no cabeçalho da requisição...
        return response.status(401).json({ error: 'Token not provid' })
        // Retorna um erro 401 (não autorizado) com a mensagem "Token not provid".
    }

    const token = authToken.split(' ').at(1)
    // Divide o valor do cabeçalho pelo espaço e pega a segunda parte (o token propriamente dito).
    // O formato esperado do cabeçalho é "Bearer <token>", por isso o token está na posição 1.

    // const [_,token] = authToken.split(' ')[1]
    // Alternativa comentada para obter o token usando destructuring assignment.

    try {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            // Verifica se o token é válido usando a chave secreta definida em authConfig.

            if (err) {
                throw new Error();
                // Se houver um erro na verificação do token, lança uma exceção para o bloco catch.
            }
            
            // Se o token for válido, recupera as informações do payload decodificado.
            request.userId = decoded.id
            request.userName = decoded.name
            // Adiciona os dados do usuário na requisição, para que estejam disponíveis nas rotas seguintes.
        })

    } catch (err) {
        // Caso ocorra um erro (token inválido ou outro problema)...
        return response.status(401).json({ error: 'Token is invalid' })
        // Retorna um erro 401 com a mensagem "Token is invalid".
    }

    return next();
    // Se o token foi verificado com sucesso, chama o próximo middleware ou rota.
}
