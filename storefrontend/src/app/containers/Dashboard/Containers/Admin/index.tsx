import React, { useState } from 'react'
import Layout from '../../../../components/Layout'
import Usertable from '../../components/Usertable'
import { RiStoreLine } from 'react-icons/ri';
import AddStorePopUp from '../../components/AddStorePopUp';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
const[active,setActive]=useState(false)

  return (
    <Layout>
    <div className='flex flex-col gap-[20px]'>
      <div className='w-[100%] flex items-center justify-center gap-[20px]'>
    <button
    onClick={()=>setActive(true)}
    className="bg-[#000300] w-[200px] mt-[10px] rounded-md text-[25px] hover:bg-green-700 text-white font-bold p-4"

  >
   Add Store
  </button>
 <a href='/stores'   className="bg-[#000300] w-[200px] mt-[10px] rounded-md text-[25px] hover:bg-green-700 text-white font-bold p-4 text-center">Stores</a>
  </div>
      <Usertable />
      {active && <AddStorePopUp setActive={setActive} />}
    </div>
    </Layout>
  )
}

export default AdminDashboard
