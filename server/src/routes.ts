import express from 'express'
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';
import ClassesController from './Controllers/ClassesController';
import ConnectionsController from './Controllers/ConnectionsController';

const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

//Corpo request.body(dados para a criação ou atualização do registro)
//Route Params: Identificar um recurso dentro da rota
//Query params: Paginação, filtros, ordenação

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections',connectionsController.create)
routes.get('/connections', connectionsController.index);
export default routes;