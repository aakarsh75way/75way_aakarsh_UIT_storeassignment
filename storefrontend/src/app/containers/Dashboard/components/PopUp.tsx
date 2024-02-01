import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


type User={
  _id:string
  username:string
  email:string
  password:string
  role:string
  preference:string
}
type Props = {
  selectedUser:User | null
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void
};
const PopUp = ({ setActive,selectedUser,onUpdate }: Props) => {
  const [formData, setFormData] = useState({
   role:selectedUser?.role
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/addstore/${selectedUser?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await response.json();
      if (res) {
        toast.success("Successfully Updated Role ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onUpdate()
        setActive(false);
      } else {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setActive(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-filter ">
      <div className="bg-[#000300] p-6 rounded-lg shadow-md w-full max-w-md">
    
        <h2 className="text-[30px] text-white font-bold mb-4 text-center">
          Update User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Role
            </label>
            <select
            
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border p-2 rounded">
          
           <option value="employee">Employee</option>
           <option value="user">User</option>


              </select>
          </div>
        
          {/* Add other input fields similarly */}
          <div className="w-[100%] flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              onClick={() => setActive(false)}
              type="button"
              className=" bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-white"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
