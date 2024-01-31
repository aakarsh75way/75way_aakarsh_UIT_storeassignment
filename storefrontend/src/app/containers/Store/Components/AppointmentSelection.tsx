import React from 'react';
import { TimeSlot } from '../../../../utils/genrateTimeSlots';
type Props={
 timeSlots:TimeSlot[]
 handleSlotSelection: (slotId: number) => void
 res: number | null;
}
const AppointmentSelection = ({ timeSlots, handleSlotSelection,res }:Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-[30px] text-center  font-bold mb-4">Select Appointment</h2>
      <div className="grid grid-cols-3 gap-4">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => handleSlotSelection(slot.id)}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            {slot.time}
          </button>
        ))}
         </div>
      {res !== null && res > 0 && (
        <p className="mt-4 text-red-600">
          Waiting time for the next available slot: {res} minutes
        </p>
      )}
    </div>
  
  );
};

export default AppointmentSelection;
