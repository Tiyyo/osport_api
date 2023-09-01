import { createUser, login } from '../service/auth.js';
export default {
    register: async (req, res) => {
        const { email, username, password } = req.body;
        await createUser({ email, username, password });
        res.status(201).json({ message: 'User created successfully' });
    },
    signin: async (req, res) => {
        const data = {
            username: req.body.username,
            password: req.body.password,
        };
        try {
            const { accessToken } = await login(data);
            res.cookie('accessToken', accessToken, {
                httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ message: 'User logged in successfully' });
        }
        catch (error) {
            res.status(200).json({ error: 'Bad credentials' });
        }
    },
    validate: async (req, res) => {
        const { decoded } = req.body;
        res.status(200).json({ message: 'User is logged in', userInfos: decoded[0] });
    },
    logout: async (_req, res) => {
        res.clearCookie('accessToken');
        res.status(200).json({ message: 'User logged out successfully' });
    },
};
