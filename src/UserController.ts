import { Request, Response } from 'express';
import User from './User';
import { Utils } from './Utils';

// create
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age, password } = req.body ?? {};

    if (!Utils.isValidName(name)) {
      res.status(400).json({ message: 'Name is required' });
      return;
    }
    if (!Utils.isValidEmail(email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }
    if (!Utils.isValidAge(age)) {
      res.status(400).json({ message: 'Age must be an integer between 0 and 120' });
      return;
    }

    if (!Utils.isValidPassword(password)) {
      res.status(400).json({ message: 'Password must contain digits only' });
      return;
    }

    const newUser = new User({ name, email, age, password });
    await newUser.save();
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      password: newUser.password,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// get
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

// get by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
};

// delete
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// update
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // resend update data
      runValidators: true, // checking schema
    });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// delete all
export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({
      message: 'All users deleted',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting users', error });
  }
};
