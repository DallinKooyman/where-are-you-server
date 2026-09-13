import express from 'express';
import { userService } from '../services/userService.js';

const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ message: `User List`, users });
  } catch (err) {
    res.status(500).json({ error: `There was an error getting the users: ${err}` });
  }
});

userRoutes.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const user = await userService.registerNewUser({ name: name });
    res.status(200).json({ message: `User was created successfully`, user });
  } catch (err) {
    res.status(500).json({ error: `There was an error creating a user: ${err}` });
  }
});

export default userRoutes;
