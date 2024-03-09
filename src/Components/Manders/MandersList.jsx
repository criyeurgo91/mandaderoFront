
import { useState, useEffect } from 'react';
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
        <div>
            <h2>Mander List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Has Car</th>
                        <th>Has Motorcycle</th>
                        <th>Is Active</th>
                        <th>Is Validated</th>
                        <th>Address</th>
                        <th>CC</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {manders.map(mander => (
                        <tr key={mander.id}>
                            <td>{mander.id}</td>
                            <td>{mander.image_mander}</td>
                            <td>{mander.ishavecar_mander ? 'Yes' : 'No'}</td>
                            <td>{mander.ishavemoto_mander ? 'Yes' : 'No'}</td>
                            <td>{mander.isactive_mander ? 'Yes' : 'No'}</td>
                            <td>{mander.isvalidate_mander ? 'Yes' : 'No'}</td>
                            <td>{mander.address_mander}</td>
                            <td>{mander.cc_mander}</td>
                            <td>{mander.user_id_user}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
