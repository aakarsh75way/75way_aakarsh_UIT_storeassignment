import React from 'react'
import  { Request, Response } from 'express';
import Store from '../models/Store';

const addStore =async (req:Request,res:Response) => {

    try {
        const {
          name,
          openTime,
          closeTime,
          numberOfEmployees,
          timeSlotInterval,
          capacityPerSlot,
        } = req.body;
    
        const newStore = new Store({
          name,
          openTime,
          closeTime,
          numberOfEmployees,
          timeSlotInterval,
          capacityPerSlot,
        });
    
        const savedStore = await newStore.save();
        res.status(201).json(savedStore);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export default addStore
