import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import { User } from "../../../../utils/types";



const Usertable = () => {
  const [active, setActive] = useState(false);
  const [users, setUsers] = useState<User[] | null>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("sessionToken");
      const response = await fetch("http://localhost:4000/api/getusers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      if (Array.isArray(res)) {
        setUsers(res);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setActive(true);
  };
  const onUpdate=()=>{
    fetchUsers()
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-100 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Preference</th>
            <th className="border p-2">Button</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length >= 1 ? (
            users?.map((user, index) => (
              <tr key={user._id}>
                <td className="border p-2 text-center text-[19px]">
                  {index + 1}
                </td>
                <td className="border p-2 text-center text-[19px]">
                  {user.username}
                </td>
                <td className="border p-2 text-center text-[19px]">
                  {user.email}
                </td>
                <td className="border p-2 text-center text-[19px]">
                  {user.role}
                </td>
                <td className="border p-2 text-center text-[19px]">
                  {user.preference}
                </td>
                <td className="border p-2 text-center text-[19px]">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-[#000300] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4 text-[25px] text-red-500">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {active && <PopUp setActive={setActive} selectedUser={selectedUser} onUpdate={onUpdate} />}
    </div>
  );
};

export default Usertable;
