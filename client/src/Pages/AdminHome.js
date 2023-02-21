import React ,{useEffect}from 'react'
import AdminDashboard from '../components/AdminDashboard'
import AdminDashboardChart from '../components/AdminDashboardChart'
import AdminDashboardNewsTable from '../components/AdminDashboardNewsTable'
import AdminSidebar from '../components/AdminSidebar'
import AdminUserTable from '../components/AdminUserTable';
import {useNavigate}  from "react-router-dom"

export default function AdminHome() {
  const navigate = useNavigate();

  
  return (
    <>
    <AdminSidebar />
    <div className=' ml-14  mt-5 mb-5 md:ml-64'>
      <AdminDashboard />
      <AdminDashboardNewsTable></AdminDashboardNewsTable>
      <AdminDashboardChart></AdminDashboardChart>
    </div>
    </>
  )
}
