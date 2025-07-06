import path from 'path';
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file,next) => {
        next(null,"Front/public/Imagenes/");
    },
    filename: (req, file, next) => {
        const ext = path.extname(file.originalname);
        const uniqueFilename = `${Date.now()}-${ext}`;
        next(null, uniqueFilename);
    },
});


const fileFilter = (req, file, next) => {
    const allowedExtensions = /jpeg|jpg|png|webp/;
    const allowedMimeType = /image\/jpeg|image\/jpg|image\/png|image\/webp/;
    
    const extensionValida = allowedExtensions.test(path.extname(file.originalname));
    const mimetypeValido = allowedMimeType.test(file.mimetype)
    

    if(extensionValida && mimetypeValido) {
        next(null, true);
    } else {
        next(new Error("Extension invalida jpeg | jpg | png | webp"), false);
    }
};

export default multer ({
    storage,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter,
});