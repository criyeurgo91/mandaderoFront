
import Generals from '../../Components/Statistics/Generals';
import RequestDay from '../../Components/Statistics/RequestDay';
import TotalRequest from '../../Components/Statistics/TotalRequest';

function Index() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col py-9">
      <div className="w-full">
        <Generals />
      </div>

      <div className="flex h-[70%]">
        <div className="w-1/2 bg-white text-sky-800 shadow-md rounded-md p-4 m-2">
          <TotalRequest />
        </div>
        <div className="w-1/2 bg-white text-sky-800 shadow-md rounded-md p-4 m-2">
          <RequestDay />
        </div>
      </div>
    </div>
  );
}

export default Index;
