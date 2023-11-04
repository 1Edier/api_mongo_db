

require('dotenv').config();
require('./src/configs/db.config');

const express = require('express');
const app = express();

const authRouter = require('./src/routes/auth.route');
const uploadsRouter = require('./src/routes/uploads.route');
const pedidosRouter = require('./src/routes/pedidos.route'); // Importa las rutas de pedidos.

app.use(express.json());

app.use('/uploads', uploadsRouter);
app.use('/auth', authRouter);
app.use('/pedidos', pedidosRouter); // Utiliza las rutas de pedidos.

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`API escuchando en el puerto ${PORT}`);
});
