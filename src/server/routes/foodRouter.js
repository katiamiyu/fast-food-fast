import express from 'express';
import foodsController from '../controllers/foodsController';

const foodRouter = express.Router();

foodRouter.route('/foods')
  .get(foodsController.get)
  .post(foodsController.add);

foodRouter.route('/foods/:id')
  .get(foodsController.getByID)
  .put(foodsController.edit)
  .delete(foodsController.remove);

export default foodRouter;
