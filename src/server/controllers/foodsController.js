import { isAbsolute } from 'path';
import foods from '../models/foods';

const foodsController = {
  add: (req, res) => {
    // add a new food item
    const { name, description, price } = req.body;

    const id = foods.length + 1;
    const newFood = {
      id,
      name,
      description,
      price,
    };

    if (typeof newFood === 'object') {
      foods.push(newFood);
      return res.json({
        status: 201,
        data: {
          message: 'food item created successfully',
          food: newFood,
        },
      });
    }

    return res.json({
      status: 400,
      error: 'error adding new food item',
    });
  },
  get: (req, res) => res.json({
    // retrieve all available food
    status: 200,
    data: {
      message: 'foods retrieved successfully',
      foods,
    },
  }),
  getByID: (req, res) => {
    // retrieve food object using id
    const id = parseInt(req.params.id, 10);

    if (id < 1) {
      return res.json({
        status: 400,
        error: 'id is inavlid',
      });
    }
    foods.map((food) => {
      if (food.id === id) {
        return res.json({
          status: 200,
          data: {
            message: 'food retrieved successfully',
            food,
          },
        });
      }
    });
    return res.json({
      status: 404,
      error: 'food not available',
    });
  },
  edit: (req, res) => {
    // modify detail of food item
    const { id } = req.params;
    const foodId = parseInt(id, 10);

    const foundFood = {};
    let position;

    const { name, description, price } = req.body;

    foods.map((food, index) => {
      if (food.id === foodId) {
        position = index;
        foundFood.id = food.id;
        foundFood.name = name || food.name;
        foundFood.description = description || food.description;
        foundFood.price = price || food.price;
      }
    });

    if (typeof foundFood !== 'object') {
      return res.json({
        status: 404,
        error: 'food not found',
      });
    }

    foods.splice(position, 1, foundFood);
    return res.json({
      status: 201,
      data: {
        message: 'food update successfully',
        food: foundFood,
      },
    });
  },
  remove: (req, res) => {
    // remove food by id
    const id = parseInt(req.params.id, 10);

    if (id < 1) {
      return res.json({
        status: 400,
        error: 'id is invalid',
      });
    }

    let position;

    foods.map((food, index) => {
      if (food.id === id) {
        position = index;
      }
    });

    if (typeof position !== 'undefined') {
      foods.splice(position, 1);
      return res.json({
        status: 200,
        data: {
          message: 'food deleted successfully',
          foods,
        },
      });
    }

    return res.json({
      status: 404,
      error: 'food not found',
    });
  },
};

export default foodsController;
