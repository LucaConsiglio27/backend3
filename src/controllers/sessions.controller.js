import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import logger from '../utils/logger.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        user.last_connection = new Date();
        await user.save();

        res.status(200).json({ status: 'success', token });
    } catch (error) {
        logger.error('Error during login:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
