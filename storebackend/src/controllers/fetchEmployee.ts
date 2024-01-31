import { Request, Response } from 'express';
import User from '../models/User';

const fetchEmployee = async (req: Request, res: Response) => {
  try {
    // Find all users with the role "employee"
    const employees = await User.find({ role: 'employee' });

    if (employees.length > 0) {
      res.status(200).json(employees);
    } else {
      res.status(404).json({ error: 'No employees found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default fetchEmployee;
