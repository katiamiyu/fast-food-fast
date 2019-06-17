import orders from '../models/orders';

const ordersController = {
  add: (req, res) => {
    const {
      userId, deliveryAddress, foods,
    } = req.body;

    const id = orders.length + 1;
    let totalPrice = 0;

    foods.forEach((food) => {
      totalPrice += (food.price * food.quantity);
    });

    const newOrder = {
      id,
      userId,
      deliveryAddress,
      foods,
      total: totalPrice,
      deliveryStatus: 'pending',
    };

    orders.push(newOrder);
    return res.json({
      status: 201,
      message: {
        data: 'order created successfully',
        order: newOrder,
      },
    });
  },
  get: (req, res) => res.json({
    status: 200,
    data: {
      message: 'orders retrieved successfully',
      orders,
    },
  }),
  getById: (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (id < 0) {
      return res.json({
        status: 404,
        error: 'id is required',
      });
    }

    orders.map((order) => {
      if (order.id === id) {
        return res.json({
          status: 200,
          data: {
            message: 'order retrieved successfully',
            order,
          },
        });
      }
    });

    return res.json({
      status: 404,
      error: 'order not found',
    });
  },
  edit: (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (id > 0) {
      let position;
      const theOrder = {};

      orders.map((order, index) => {
        if (order.id === id) {
          position = index;
          theOrder.id = order.id;
          theOrder.deliveryAddress = order.deliveryAddress;
          theOrder.foods = order.foods;
          theOrder.total = order.total;
          theOrder.deliveryStatus = req.body.deliveryStatus || order.deliveryStatus;
        }
      });

      if (typeof position === 'undefined') {
        return res.json({
          status: 404,
          error: 'order not found',
        });
      }

      orders.splice(position, 1, theOrder);

      return res.json({
        status: 200,
        data: {
          message: 'order updated successfully',
          order: theOrder,
        },
      });
    }
    return res.json({
      status: 404,
      error: 'id is required',
    });
  },
  remove: (req, res) => {
    const id = parseInt(req.params.id, 10);
    let position;

    if (id < 0) {
      return res.json({
        status: 404,
        error: 'id is required',
      });
    }

    orders.map((order, index) => {
      if (order.id === id) {
        position = index;
      }
    });

    if (typeof position === 'undefined') {
      return res.json({
        status: 404,
        error: 'order not found',
      });
    }

    orders.splice(position, 1);

    return res.json({
      status: 200,
      data: {
        message: 'order removed successfully',
      },
    });
  },
};
export default ordersController;
