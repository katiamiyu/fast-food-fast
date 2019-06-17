import express from 'express';
import ordersController from '../controllers/ordersController';

const orderRouter = express.Router();

orderRouter.route('/orders')
  .get(ordersController.get)
  .post(ordersController.add);
orderRouter.route('/orders/:id')
  .get(ordersController.getById)
  .patch(ordersController.edit)
  .delete(ordersController.remove);

export default orderRouter;
