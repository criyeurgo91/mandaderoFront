import React from 'react'

const LayoutComp = ({ children }) => {
  return (
    <div className='flex flex-col justify-center items-center mt-8'>
      {children}
    </div>
  )
}

export default LayoutComp
