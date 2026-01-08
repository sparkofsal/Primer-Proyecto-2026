require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const ejemploRoutes = require('./routes/ejemplo.routes'); 
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes'); // AGREGUE ESTA
const adminRoutes = require('./routes/admin.routes'); //Y ESTA TAMBIEN PARA MAS SEGURIDAD

app.get('/', (req, res) => {
  res.send('El servidor funciona correctamente');
});

app.use('/api/ejemplos', ejemploRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // AGREGUE ESTA PARA
app.use('/api/admin', adminRoutes); // Y ESTA TAMBIEN PARA MAS SEGURIDAD

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor escucha en http://localhost:${PORT}`);
});
