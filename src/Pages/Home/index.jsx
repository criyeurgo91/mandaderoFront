
import ManderActive from '../../Components/Statistics/ManderActive';
import RequestDay from '../../Components/Statistics/RequestDay';
import TotalManders from '../../Components/Statistics/TotalManders';
import TotalRequest from '../../Components/Statistics/TotalRequest';
import TotalUsers from '../../Components/Statistics/TotalUsers';

function index() {
  return (
    <div className="flex flex-col h-screen py-12">
      {/* Top components */}
      <div className="flex justify-around items-center bg-gray-100 shadow-md rounded-md p-4 h-[30%]">
        <TotalUsers />
        <TotalManders />
        <ManderActive />
      </div>
      {/* Bottom components */}
      <div className="flex h-[70%]">
        <div className="w-1/2 bg-white text-sky-800 shadow-md rounded-md p-4">
          <TotalRequest/>
        </div>
        <div className="w-1/2 bg-white text-sky-800 shadow-md rounded-md p-4">
          <RequestDay />
        </div>
      </div>
    </div>
  );
}

export default index;










