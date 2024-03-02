

const LayoutComp = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-8'>
      <Sidebar/>

      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-primary-700">
        
          <UserView/>
        </div>
    </div>
  )
}

export default LayoutComp;
