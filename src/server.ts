import 'dotenv/config';
import app from './app';
import sequelize from './models';
const PORT = process.env.APP_PORT || 3000;

void sequelize;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
