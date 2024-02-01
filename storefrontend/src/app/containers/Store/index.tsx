import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StoreOverview from '../Dashboard/components/StoreOverview';
import { Link } from 'react-router-dom';
import { Store } from '../../../utils/types';

const StorePage = () => {
 
  const [stores, setStores] = useState<Store[] | null>(null);
  const role=localStorage.getItem("role")
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
  const onUpdate=()=>{
    fetchStores();
  }

  return (
    <Layout>
      <div className="flex gap-[40px] h-screen flex-wrap p-5 ml-20">
        {Array.isArray(stores) && stores.length ? (
          stores.map((store) => (
           
            <StoreOverview key={store._id} store={store} onUpdate={onUpdate} />
         
          ))
        ) : (
          <Link to="/" className="underline w-[100%] text-[40px] text-center text-blue-500">
          {role==="admin" ? " NO STORES AVAILABLE, PLEASE ADD STORES" : "NO STORES AVAILBALE" } 
          </Link>
        )}
   </div>
    </Layout>
  );
};

export default StorePage;
