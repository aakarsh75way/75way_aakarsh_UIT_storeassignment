import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FormData } from "../../../../utils/types";


type Props = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddStorePopUp = ({ setActive }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    openTime: "",
    closeTime: "",
    timeSlotInterval: "",
    capacityPerSlot: "",
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
      const response = await fetch(`http://localhost:4000/api/addstore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await response.json();
      if (res) {
        toast.success("Successfully Added Store", {
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
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <h2 className="text-[30px] text-white font-bold mb-4 text-center">
          Add Store
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Open Time:
            </label>
            <input
              type="text"
              name="openTime"
              value={formData.openTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Close Time:
            </label>
            <input
              type="text"
              name="closeTime"
              value={formData.closeTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Time Slot Interval:
            </label>
            <input
              type="text"
              name="timeSlotInterval"
              value={formData.timeSlotInterval}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Capacity Per Slot:
            </label>
            <input
              type="text"
              name="capacityPerSlot"
              value={formData.capacityPerSlot}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
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

export default AddStorePopUp;
