import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth.js';
import User from '../models/User.js';

class SessionController {
    async store(request, response) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        const emailOrPasswordIncorrect = () =>
            response.status(401).json({ error: 'Verifique se seu email ou senha estão corretos' });

        const isValid = await schema.isValid(request.body);

        if (!isValid) {
            return emailOrPasswordIncorrect();
        }

        const { email, password } = request.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return emailOrPasswordIncorrect();
        }

        const checkPassword = await user.checkPassword(password)

        if(!checkPassword){
            return emailOrPasswordIncorrect();

        }

        return response.status(201).json({
            id: user.id,
            name: user.name,
            email,
            admin: user.admin,
            token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
