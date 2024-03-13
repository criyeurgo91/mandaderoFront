
import { useState, useEffect } from 'react';
import axios from 'axios';

function MandersList() {
    const [mander, setMander] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredManders, setFilteredManders] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedManderID, setSelectedManderId] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
  
    useEffect(() => {
      fetchManders();
    }, []);
  
    const fetchManders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/mander/');
        const mandersWithUserInfo = await Promise.all(
          response.data.map(async (mander) => {
            const userResponse = await axios.get(`http://127.0.0.1:8000/api/user/${mander.user_id_user}/`);
            return {
              ...mander,
              user: userResponse.data,
            };
          })
        );
        setMander(mandersWithUserInfo);
        setFilteredManders(mandersWithUserInfo);
      } catch (error) {
        console.error('Error fetching manders:', error);
      }
    };
  
    const handleEditMander = (manderId) => {
      setSelectedManderId(manderId);
      setShowUpdateForm(true);
    };
  
    const handleUpdateMander = () => {
      fetchManders();
      setShowUpdateForm(false);
    };
  
    const handleDeleteMander = async (manderId) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/mander/${manderId}/`);
        fetchManders();
      } catch (error) {
        console.error('Error deleting mander:', error);
      }
    };
  
    const handleSearchMander = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      setSearchTerm(searchTerm);
      const filtered = mander.filter(mander =>
        mander.user.name_user.toLowerCase().includes(searchTerm) ||
        mander.user.lastname_user.toLowerCase().includes(searchTerm) ||
        mander.user.phone_user.toLowerCase().includes(searchTerm)
      );
      setFilteredManders(filtered);
  
      if (filtered.length === 0) {
        setAlertMessage("Mandadero doesn't exist");
      } else {
        setAlertMessage('');
      }
    };
  
  }
      


export default MandersList
