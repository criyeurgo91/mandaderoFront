import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

const UpdateVehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image_vehicle: "",
    color_vehicle: "",
    isverified_vehicle: false,
    user_id_user: id
  });

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchVehicleDetails();
  }, []);

  const fetchVehicleDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/vehicle/${id}`);
      const { data } = response;
      setFormData({
        image_vehicle: data.image_vehicle,
        color_vehicle: data.color_vehicle,
        isverified_vehicle: data.isverified_vehicle,
        user_id_user: data.user_id_user,
      });
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      setLoading(true);
      const response = await axios.patch(`${apiUrl}/api/vehicle/${id}/`, formDataToSend);
      console.log('Response:', response.data);
      setLoading(false);
      alert('Formulario actualizado exitosamente');
      navigate(-1);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      alert('Hubo un error al enviar el formulario');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setFormData({
      ...formData,
      image_vehicle: file
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const colors = [
    "White", "Black", "Gray", "Silver", "Red", "Blue", "Yellow",
    "Green", "Orange", "Brown", "Beige", "Pearl White", "Matte Black",
    "Dark Gray", "Navy Blue", "Crimson Red", "Bright Yellow", "Multicolor",
  ];

  return (
    <div className="bg-stone-900 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-md mt-20 w-80">
        <div>
          <h1 className="text-2xl text-center font-bold mb-4 text-white">Update Vehicle</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Color:</label>
              <select
                name="color_vehicle"
                value={formData.color_vehicle || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              >
                <option value="">Select Color</option>
                {colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  name="isverified_vehicle"
                  checked={formData.isverified_vehicle}
                  onChange={(e) => setFormData({ ...formData, isverified_vehicle: e.target.checked })}
                  className="ml-2"
                />
                <span className="ml-2 text-white">Verified</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Image:</label>
              <input
                type="file"
                name="image_vehicle"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-40" />}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
              <button
                type="button"
                className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVehicleForm;
