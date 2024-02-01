import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeePopup from "./EmployeePopup";
import { Store } from "../../../../utils/types";


interface Props{
  store:Store
  onUpdate:()=>void
}

const StoreOverview = ({ store,onUpdate }: Props) => {
  const role = localStorage.getItem("role");
  const[active,setActive]=useState(false)
  return (
    <div className="relative">
      <div className=" bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="  h-60 w-full mb-4 overflow-hidden bg-gray-200">
          <img
            src={`https://source.unsplash.com/400x200/?store,${store.name}`}
            alt={`Store: ${store.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold mb-2">{store.name}</h2>
        <p className="text-gray-700 mb-2">
          Opening Time: {store.openTime} - Closing Time: {store.closeTime}
        </p>
        <p className="text-gray-700 mb-2">
          Number of Employees: {store.employees.length}
        </p>
        <div className="flex w-[100%] justify-between">
          {" "}
          <Link
            to={`/store/${store._id}`}
            className="text-blue-500 hover:underline block"
          >
            View Details
          </Link>
          {role === "admin" && (
            <button onClick={()=>setActive(true)} className="text-blue-500 hover:underline block">
              Assign Employee
            </button>
          )}
        </div>
       
      </div>
      {active && <EmployeePopup setActive={setActive} store={store}  onUpdate={ onUpdate} />}
    </div>
  );
};

export default StoreOverview;
