import React from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../../../../utils/store/combineReducers'
import UserDashboard from './User';
import EmployeeDashboard from './Employee';
import AdminDashboard from './Admin';
import { Navigate } from 'react-router-dom';

const DashboardRoutes = () => {
    //defining multiple routes for app.
    const userRole = localStorage.getItem("role")
        if(userRole==="admin"){
          return <AdminDashboard />
       }
       if(userRole==="user"){
          return <UserDashboard />
   
       }
       if(userRole==="employee"){
        return  <EmployeeDashboard />
       }
      return  <Navigate to="/auth/login" />;
}

export default DashboardRoutes
