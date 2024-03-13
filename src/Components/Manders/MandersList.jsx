import  { useState, useEffect } from 'react';
import axios from 'axios';

export const MandersList = () => {
    const [manders, setManders] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/mander/')
            .then(response => {
                setManders(response.data);
            })
            .catch(error => {
                console.error('Error fetching manders:', error);
            });
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Mander List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {manders.map(mander => (
                    <div key={mander.id} className="bg-white rounded-lg shadow-md p-4">
                        <img src={mander.image_mander} alt={`Mander ${mander.id}`} className="w-full h-auto mb-2 rounded-lg" />
                        <p className="text-sm mb-1"><span className="font-bold">ID:</span> {mander.id}</p>
                        <p className="text-sm mb-1"><span className="font-bold">Has Car:</span> {mander.ishavecar_mander ? 'Yes' : 'No'}</p>
                        <p className="text-sm mb-1"><span className="font-bold">Has Motorcycle:</span> {mander.ishavemoto_mander ? 'Yes' : 'No'}</p>
                        <p className="text-sm mb-1"><span className="font-bold">Is Active:</span> {mander.isactive_mander ? 'Yes' : 'No'}</p>
                        <p className="text-sm mb-1"><span className="font-bold">Is Validated:</span> {mander.isvalidate_mander ? 'Yes' : 'No'}</p>
                        <p className="text-sm mb-1"><span className="font-bold">Address:</span> {mander.address_mander}</p>
                        <p className="text-sm mb-1"><span className="font-bold">CC:</span> {mander.cc_mander}</p>
                        <p className="text-sm mb-1"><span className="font-bold">User ID:</span> {mander.user_id_user}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MandersList;
