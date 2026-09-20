import express from 'express';
import { userService } from '../services/userService.js';
import { missingRequiredUserName } from '../utils/responseUtils.js';

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
  if (!req.body || !req.body.name) {
    return res.status(400).json(missingRequiredUserName);
  }
  const name = req.body.name;
  try {
    const user = await userService.registerNewUser({ name: name });
    res.status(200).json({ message: `User was created successfully`, user });
  } catch (err) {
    res.status(500).json({ error: `There was an error creating a user: ${err}` });
  }
});

userRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ message: `No user with the id: ${id}` });
    }
    res.status(200).json({ message: 'Successfully retrieved the user', user });
  } catch (err) {
    res.status(500).json({ error: `There was an error getting the user: ${err}` });
  }
});

userRoutes.put('/:id', async (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json(missingRequiredUserName);
  }
  const name = req.body.name;
  const { id } = req.params;
  try {
    const user = await userService.updateUser(id, name);
    if (!user) {
      res.status(404).json({ message: `No user with the id: ${id}` });
    }
    res.status(200).json({ message: 'Successfully retrieved the user', user });
  } catch (err) {
    res.status(500).json({ error: `There was an error getting the user: ${err}` });
  }
});

userRoutes.delete(':id', async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.status(200).json({ message: `User was deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: `There was an error when deleting the user: ${err}` });
  }
});

export default userRoutes;
