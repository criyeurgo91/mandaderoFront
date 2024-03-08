import React from 'react';
import Sidebar from '../Navbar/Sidebar';
import Headers from '../Headers/index'




const LayoutComp = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-1">
        <Sidebar/>
        <Headers/>
      </div>
     
    </div>
  )
}

export default LayoutComp;


