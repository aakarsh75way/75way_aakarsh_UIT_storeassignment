import React from 'react'
import  { Request, Response } from 'express';
import Store from '../models/Store';
import moment from 'moment';
type Appointment = {
    id: number;
    time: string;
  };
const bookSlot =async (req:Request,res:Response) => {
    try {
        const { storeId, slotId } = req.body;
    
        // Find the store by ID
        const store = await Store.findById(storeId);
     
        if (!store) {
          return res.status(404).json({ error: 'Store not found' });
        }
    
        // Check if the slot is already booked
        if (store.bookedAppointments.includes(slotId)) {
          return res.status(400).json({ error: 'Slot is already booked Try another Slot' });
        }
    
        // If the slot is not booked, mark it as booked
        store.bookedAppointments.push(slotId);
        await store.save();
        const currentTime = moment();
        const nextAvailableSlot = store.bookedAppointments
          .filter((appointment:Appointment) => moment(appointment.time).isAfter(currentTime))
          .sort((a:any, b:any) => moment(a).diff(moment(b)))[0];
    
        const waitingTime = nextAvailableSlot
          ? moment(nextAvailableSlot).diff(currentTime, 'minutes')
          : 0;
    
        return res.status(201).json({
          message: 'Appointment booked successfully',
          waitingTime: waitingTime,
        });
    
       
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

export default bookSlot
