import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(routes);
app.use(cors);

//http://localhost:3333
app.listen(3333);
