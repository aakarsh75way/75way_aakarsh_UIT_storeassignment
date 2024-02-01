import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Store from '../models/Store';

const sendEmails = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const { emails } = req.body;
const newId=new mongoose.Types.ObjectId(id)

// Update the store by adding emails to the 'employees' array
const store = await Store.findByIdAndUpdate(
  { _id: id },
  { $addToSet: { employees: { $each: emails } } },
  { new: true }
);
  

    if (store) {
      return res.status(200).json({ message: 'Emails added successfully', store });
    } else {
      return res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default sendEmails;
