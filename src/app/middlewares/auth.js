import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

function authMiddleware(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const token = authToken.split(' ')[1];

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Invalid token' });
    }
    

    // Define as informações do usuário no objeto `request` para uso posterior
    request.userId = decoded.id;
    request.userName = decoded.name;

    // Chama o próximo middleware ou rota após a verificação do token
    return next();
  });
}

export default authMiddleware;
