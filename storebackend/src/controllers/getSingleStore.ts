import React from 'react'
import  { Request, Response } from 'express';
import Store from '../models/Store';

const getSingleStore =async (req:Request,res:Response) => {
   const {id}=req.params
    try { 
     const store=await Store.findById({_id:id})
     if(store){
      return  res.status(201).json(store);
     }
      return  res.status(400).json("NO STORE Found");

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export default getSingleStore
