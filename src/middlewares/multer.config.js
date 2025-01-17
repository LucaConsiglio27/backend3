import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, path.join(__dirname, '../uploads/pets'));
        } else {
            cb(null, path.join(__dirname, '../uploads/documents'));
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    },
});

export default multer({ storage });
