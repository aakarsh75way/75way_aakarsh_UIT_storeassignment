import React from 'react'
import  { Request, Response } from 'express';
import Store from '../models/Store';
import User from '../models/User';
interface CustomRequest extends Request {
  decoded?: {
    userId: string;
    email: string;
    role: string;
  };
  userRole?: string;
}
const getAllUsers =async (req:CustomRequest,res:Response) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Forbidden. Only admin can upload documents.' });
  }
    try {
      const users = await User.find({ role: { $ne: 'admin' } });
     console.log(users)
     if(users.length>=1){
      return  res.status(201).json(users);
     }
      return  res.status(400).json("NO USERS ");
 
       
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export default getAllUsers
