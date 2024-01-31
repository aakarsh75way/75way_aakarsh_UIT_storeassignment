import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateTimeSlots } from '../../../../utils/genrateTimeSlots';
import AppointmentSelection from './AppointmentSelection';

type Store = {
  _id: string;
  name: string;
  openTime: string;
  closeTime: string;
  employees: Array<string>;
  timeSlotInterval: number;
  capacityPerSlot: number;
  __v: number;
};

const SingleStorePage = () => {
  const { id } = useParams();
  const [selectedSlot, setSelectedSlot] = useState<number | string>("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [res, setRes] = useState<number | null>(null);


  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/getstore/${id}`);
        const res: Store = await response.json();
        if (res) {
          setSelectedStore(res);
       
        } else {
          setError('Error fetching store');
        }
      } catch (err) {
        setError('Error fetching store');
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  const handleSlotSelection = async (slotId: number) => {
    try {
        const response = await fetch('http://localhost:4000/api/appointments/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ storeId:selectedStore?._id, slotId }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
            setSelectedSlot(slotId)
            setRes(data.waitingTime)
        } else {
            setError(data.error);
           setTimeout(()=>{
            setError("");
           },2000)

        }
      } catch (error) {
        console.error(error);
      }
  };


  const timeSlots = generateTimeSlots(
    selectedStore?.openTime || '',
    selectedStore?.closeTime || '',
    selectedStore?.timeSlotInterval || 15
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className=" text-center text-[50px] text-blue-600 font-bold mb-4">{selectedStore?.name} Details</h2>
      {selectedSlot ? (
        <p className="text-green-500 font-semibold mb-4">
          Selected Appointment: {timeSlots.find((slot) => slot.id === selectedSlot)?.time}
        </p>
      ) : null}
      {
        error ? (<p className='text-red-500 font-bold text-[20px]'>{error} </p>):null
      }
      <AppointmentSelection
        timeSlots={timeSlots}
        handleSlotSelection={handleSlotSelection}
        res={res}
      />
    </div>
  );
};

export default SingleStorePage;
