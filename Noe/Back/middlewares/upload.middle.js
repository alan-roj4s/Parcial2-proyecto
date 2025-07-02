import path from 'path';
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file,next) => {
        next(null,"public/Imagenes/");
    },
    filename: (req, res, next) => {
        const ext = path.extname(file.originalname);
        const uniqueFilename = `${Date.now()}-${ext}`;
        next(null, uniqueFilename);
    },
});


const fileFilter = (req, file, next) => {
    const allowedType = /jpeg|jpg|png|webp/;
    const ext = allowedType.test(path.extname(file.originalname));
    const mimetype = allowedType(file.mimetype);

    if(ext && mimetype) {
        next(null, true);
    } else {
        next(new Error("Extension invalida jpeg | jpg | png | webp"));
    }
};

export default multer ({
    storage,
    limits: {fieldSize: 5 * 1024 * 1024},
    fileFilter,
});