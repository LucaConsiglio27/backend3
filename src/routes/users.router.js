import { Router } from 'express';
import multer from 'multer';
import { uploadUserDocuments } from '../controllers/users.controller.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.mimetype.startsWith('image/') ? 'pets' : 'documents';
        cb(null, path.resolve(`uploads/${folder}`));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const router = Router();

router.post('/:uid/documents', upload.array('documents'), uploadUserDocuments);

export default router;
