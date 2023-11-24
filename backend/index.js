import express from 'express';
import './database/mongoBD.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/autenticacion_route.js'; // Importar las rutas de autenticación
import entradasRoutes from './routes/post_routes.js'; // Importar las rutas de entradas
import usersRoutes from './routes/usersRoutes.js'; // Importar las rutas de usuarios
import categoriasRoutes from './routes/categorias_routes.js'; // Importar las rutas de categorias

const app = express();

app.use(express.static('public')); 
app.use(express.json());
app.use(cookieParser());

app.use('/Api/v1/auth', authRoutes );

app.use('/Api/v1/entradas', entradasRoutes);

app.use('/Api/v1/users', usersRoutes);

app.use('/Api/v1/categorias', categoriasRoutes);




app.get('/', (req, res) => {
        // Use the req parameter if needed
        // For example, you can access query parameters using req.query
        res.send('Helanda, ¡Estás conectado a la base de datos!. 😺😺😺');
});

app.listen(2023, function () {
        console.log("🔥🔥🔥 Servidor corriendo en: http://localhost:2023");
});