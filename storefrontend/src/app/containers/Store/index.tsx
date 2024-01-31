import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StoreOverview from '../Dashboard/components/StoreOverview';
import { Link } from 'react-router-dom';

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
  
const StorePage = () => {
  const [stores, setStores] = useState<Store[] | null>(null);

  const fetchStores = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/addStore");
      const res: Store[] = await response.json();
      setStores(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <Layout>
      <div className="flex gap-[40px] h-screen">
        {Array.isArray(stores) && stores.length ? (
          stores.map((store) => (
           
            <StoreOverview key={store._id} store={store} />
         
          ))
        ) : (
          <Link to="/" className="underline w-[100%] text-[40px] text-center text-blue-500">
            NO STORES AVAILABLE, PLEASE ADD STORES
          </Link>
        )}
   </div>
    </Layout>
  );
};

export default StorePage;
