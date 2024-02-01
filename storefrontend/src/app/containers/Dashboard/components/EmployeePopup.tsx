import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Store, User } from '../../../../utils/types';

type Props={
    store: Store;
    setActive:React.Dispatch<React.SetStateAction<boolean>>
    onUpdate:()=>void
}

  
  
const EmployeePopup = ({setActive,store,onUpdate}:Props) => {
  const [users, setUsers] = useState<User[] | null>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/fetchemployee");
      const res: User[] = await response.json();
      if (res.length >= 1) {
        setUsers(res);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCheckboxChange = (email: string) => {
    setSelectedEmployees((prevSelected) => {
      if (prevSelected.includes(email)) {
        return prevSelected.filter((selectedEmail) => selectedEmail !== email);
      } else {
        return [...prevSelected, email];
      }
    });
  };

  const handleSendEmails = async () => {
    try {
      // Send the selected employee emails to the backend
      const response = await fetch(`http://localhost:4000/api/sendemails/${store._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails: selectedEmployees }),
      });

      const data = await response.json();

      if (response.ok) {
        onUpdate()
        setActive(false)
       
      } else {
        console.log("error",data)
        setActive(false)
      
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed  inset-0 flex items-center z-[1000] justify-center backdrop-filter ">
      <div className="bg-[#000300] p-6 rounded-lg max-h-max shadow-md w-full  max-w-md">
  
        <h2 className="text-[30px] text-white font-bold mb-4 text-center">
          Select Employees
        </h2>
        <div className="flex flex-col items-start space-y-2">
          {users?.map((user) => (
            <div key={user._id} className="flex items-center gap-[10px]">
              <input
                type="checkbox"
                checked={selectedEmployees.includes(user.email)}
                onChange={() => handleCheckboxChange(user.email)}
                
                className="mr-2"
              />
              <span className="text-white text-[20px] font-bold">{user.email}</span>
            </div>
          ))}
        </div>
        <div className="w-[100%] flex items-center justify-between mt-4">
          <button
            onClick={handleSendEmails}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Send Emails
          </button>
          <button
            onClick={() => {
              setActive(false);
            }}
            type="button"
            className="bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeePopup;
