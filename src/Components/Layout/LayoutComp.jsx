import React from 'react';
import Sidebar from '../Navbar/Sidebar';




const LayoutComp = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-1">
        <Sidebar/>
      </div>
     
    </div>
  )
}

export default LayoutComp;


