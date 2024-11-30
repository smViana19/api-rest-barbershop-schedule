import express from 'express';
import cors from 'cors';
import erroHandler from './middlewares/errorHandler';
import router from './routes';
const app = express();

app.use(cors());
app.use(express.json());
app.use(router)
app.use(erroHandler)
export default app;
