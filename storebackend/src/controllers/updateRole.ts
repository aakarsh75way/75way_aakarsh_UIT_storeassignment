import { Request, Response } from 'express';
import User from '../models/User';

const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  console.log("Id",id,"Role",role)

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (updatedUser) {
      return res.status(201).json(updatedUser);
    }

    return res.status(400).json("NO USER Found");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default updateRole;
