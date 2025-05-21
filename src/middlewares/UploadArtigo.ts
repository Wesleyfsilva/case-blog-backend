import multer from 'multer';
import path from 'path';

// Define o destino onde os arquivos serão salvos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads/artigos'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const uploadArtigo = multer({ storage });
