import React from 'react'
import  { Request, Response } from 'express';
import Store from '../models/Store';

const getStore =async (req:Request,res:Response) => {

    try {
        
    
     const store=await Store.find({})
     if(store.length>=1){
      return  res.status(201).json(store);
     }
      return  res.status(400).json("NO STORES AVAILABLE");
 
       
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export default getStore
