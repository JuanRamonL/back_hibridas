
import multer from 'multer';

const storage = multer.diskStorage({
    //Si hay un error retorna null de lo contratio guarda la imagen en el directorio "public/img"
    destination: (req, file, cb) => {
            cb(null, './public/img')
    },
    //Definimos el nombre del archivo. Si hay un error. retorna null, de lo contrario, retorna el nombre del archivo.
    filename: (req, file, cb) => {
            const extension = file.originalname.split('.').pop();
            cb(null, `${Date.now()}.${extension}` )
    }
})

 const upload = multer({ storage: storage });


export const subirImagen = async (req, res) => {
    upload.single('file'), (req, res) => {
        res.send({ data: 'Imagen subida correctamente ' })
    }
}

