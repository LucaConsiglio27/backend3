import User from '../models/user.model.js';
import path from 'path';

export const uploadUserDocuments = async (req, res, next) => {
    try {
        const { uid } = req.params;

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No se cargaron documentos' });
        }

        const uploadedDocuments = req.files.map((file) => ({
            name: file.originalname,
            reference: path.join('documents', file.filename),
        }));

        user.documents.push(...uploadedDocuments);
        await user.save();

        res.status(200).json({
            message: 'Documentos subidos correctamente',
            documents: user.documents,
        });
    } catch (error) {
        next(error);
    }
};
