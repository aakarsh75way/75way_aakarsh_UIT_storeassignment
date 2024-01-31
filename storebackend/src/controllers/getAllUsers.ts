import React from 'react'
import  { Request, Response } from 'express';
import Store from '../models/Store';
import User from '../models/User';

const getAllUsers =async (req:Request,res:Response) => {
console.log("YAha aya ma");

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
