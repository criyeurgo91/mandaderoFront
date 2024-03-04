import React from 'react';
import Sidebar from '../Navbar/Sidebar';
import UserList from '../User/UserList';
import UserForm from '../Forms/UserForm';
import VehicleForm from '../Forms/VehicleForm'

const LayoutComp = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-1">
        <Sidebar/>
      </div>
      <main className="col-span-11">
        <VehicleForm/>
      </main>
    </div>
  )
}

export default LayoutComp;


