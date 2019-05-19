import users from '../models/users';

const authController = {
  createUser: (req, res) => {
    const {
      firstName, lastName, phone, email, password, isAdmin,
    } = req.body;
    if (firstName === undefined) {
      return res.json({
        status: 400,
        error: 'first name is required',
      });
    }
    if (lastName === undefined) {
      return res.json({
        status: 400,
        error: 'last name is required',
      });
    }
    if (phone === undefined) {
      return res.json({
        status: 400,
        error: 'phone number is required',
      });
    }
    if (email === undefined) {
      return res.json({
        status: 400,
        error: 'email is required',
      });
    }
    const user = {
      id: users.length + 1,
      firstName,
      lastName,
      phone,
      email,
      password,
      isAdmin,
    };
    users.push(user);
    return res.json({
      status: 201,
      data: {
        token: 'not yet',
        user: users,
      },
    });
  },
  loginUser: (req, res) => {
    const { email, password } = req.body;
    if (email === undefined) {
      return res.json({
        status: 400,
        error: 'email is required',
      });
    }
    if (password) {
      users.map((user) => {
        if ((user.email === email) && (user.password === password)) {
          return res.json({
            status: 200,
            data: { token: 'not yet', message: 'logged in successfully' },
          });
        }
      });
      return res.json({
        status: 400,
        error: 'user not found',
      });
    }
  },
};

export default authController;
