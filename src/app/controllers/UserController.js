import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/user.js';

class UserController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { name, email, password, admin } = request.body;
        const userExist = await User.findOne({ where: { email } });

        if (userExist) {
            return response.status(400).json({ error: 'Email já existe' });
        }

        try {
            const user = await User.create({
                id: uuidv4(),
                name,
                email,
                password,
                admin,
            });

            return response.status(201).json({
                id: user.id,
                name,
                email,
                admin,
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return response.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }
}

export default new UserController();
