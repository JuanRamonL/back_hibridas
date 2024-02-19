import express from 'express';
import cors from 'cors'
import multer from 'multer'; //alimimnar
import './database/mongoBD.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/autenticacion_route.js'; // Importar las rutas de autenticación
import entradasRoutes from './routes/post_routes.js'; // Importar las rutas de entradas
import usersRoutes from './routes/usersRoutes.js'; // Importar las rutas de usuarios
import categoriasRoutes from './routes/categorias_routes.js'; // Importar las rutas de categorias

const app = express();


/**Definimos la ubicación y el nombre del archivo donde se guardarán las imágenes. 
 * @param {Object} req - Objeto de solicitud
 * @param {Object} file - Archivo
 * @param {function} cb - Función de devolución de llamada
 */
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




app.use(cors())
app.use(express.static('public')); 
app.use(express.json());
app.use(cookieParser());

app.use('/Api/v1/auth', authRoutes );

app.use('/Api/v1/entradas', entradasRoutes);

app.use('/Api/v1/users', usersRoutes);

app.use('/Api/v1/categorias', categoriasRoutes);

app.post('/Api/v1/upload', upload.single('file'), (req, res) => {
        res.send({ data: 'Imagen subida correctamente ' })
})


app.get('/', (req, res) => {
        // Use the req parameter if needed
        // For example, you can access query parameters using req.query
        res.send('Helanda, ¡Estás conectado a la base de datos!. 😺😺😺');
});

app.listen(2023, function () {
        console.log("🔥🔥🔥 Servidor corriendo en: http://localhost:2023");
});