import React from 'react';
import AdminAllNewsTable from '../components/AdminAllNewsTable';
import AdminSidebar from '../components/AdminSidebar'


export default function AdminAllNews() {
  return (
    <div>
        <AdminSidebar></AdminSidebar>

        <AdminAllNewsTable></AdminAllNewsTable>
    </div>
    
  )
}
