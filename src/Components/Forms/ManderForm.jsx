import { useState } from 'react';
import axios from 'axios';

const ManderForm = () => {
  const [formData, setFormData] = useState({
    email_account: '',
    password_account: '',
    name_user: '',
    lastname_user: '',
    phone_user: '',
    ismander_user:false,
    image_mander: null,
    address_mander: '',
    cc_mander: '',
    ishavecar_mander:false,
    ishavemoto_mander:false,
    isactive_mander: false,
    isvalidate_mander: false,
    
  });

  const [message, setMessage]=useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image_mander: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/account/', {
        email_account: formData.email_account,
        password_account: formData.password_account,
        isadmin_account: formData.isadmin_account,
      });
      const accountId = response.data.id_account;

      const userResponse = await axios.post('http://127.0.0.1:8000/api/user/', {
        account_id_account: accountId,
        image_user: formData.image_user,
        name_user: formData.name_user,
        lastname_user: formData.lastname_user,
        phone_user: formData.phone_user,
        ismander_user: formData.ismander_user ? formData.ismander_user : false, // Check si está marcado
      });
      const userId = userResponse.data.id_user;

      const manderResponse = await axios.post('http://127.0.0.1:8000/api/mander/', {
        user_id_user: userId,
      image_mander: formData.image_mander,
      ishavecar_mander: formData.ishavecar_mander ? formData.ishavecar_mander : false, // Check si está marcado
      ishavemoto_mander: formData.ishavemoto_mander ? formData.ishavemoto_mander : false, // Check si está marcado
      address_mander: formData.address_mander,
      cc_mander: formData.cc_mander,
      isactive_mander: formData.isactive_mander ? formData.isactive_mander : false, // Check si está marcado
      isvalidate_mander: formData.isvalidate_mander ? formData.isvalidate_mander : false, // Check si está marcado
      });
      const manderId = manderResponse.data.id_mander;

      console.log('Mander, user, account:', manderResponse.data, userResponse.data, response.data);
      // Manejo de respuesta exitosa

      // Limpiar Formulario
    setFormData({
      email_account: '',
      password_account: '',
      name_user: '',
      lastname_user: '',
      phone_user: '',
      ismander_user: false,
      image_mander: null,
      address_mander: '',
      cc_mander: '',
      ishavecar_mander: false,
      ishavemoto_mander: false,
      isactive_mander: false,
      isvalidate_mander: false,
      message: 'Mander created successfully',
    });
    

    } catch (error) {
      console.error('Error creating Mander, User, Account:', error);
      // Manejo de error
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Crear Mander</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">

        {/* Campos para la cuenta */}
        <div>
          <label htmlFor="email_account" className="block">Email:</label>
          <input type="email" id="email_account" name="email_account" value={formData.email_account} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="password_account" className="block">Contraseña:</label>
          <input type="password" id="password_account" name="password_account" value={formData.password_account} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        {/* Campos para el usuario */}
        <div>
          <label htmlFor="name_user" className="block">Nombre:</label>
          <input type="text" id="name_user" name="name_user" value={formData.name_user} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="lastname_user" className="block">Apellido:</label>
          <input type="text" id="lastname_user" name="lastname_user" value={formData.lastname_user} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="phone_user" className="block">Teléfono:</label>
          <input type="text" id="phone_user" name="phone_user" value={formData.phone_user} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label htmlFor="ismander_user" className="form-checkbox">Is Mander?:</label>
          <input type="checkbox" name='ismander_user' id='ismander_user' onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        {/* Campos para la imagen */}
        <div>
          <label htmlFor="image_mander" className="block">Imagen:</label>
          <input type="file" id="image_mander" name="image_mander" onChange={handleImageChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        {/* Campos para el mandadero */}

        <div>
          <label htmlFor="cc_mander" className="block">Cédula:</label>
          <input type="text" id="cc_mander" name="cc_mander" value={formData.cc_mander} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label htmlFor="address_mander" className="block">Dirección:</label>
          <input type="text" id="address_mander" name="address_mander" value={formData.address_mander} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        
        <div>
          <label htmlFor="ishavemoto_mander" className="form-checkbox">Is have a Bike?:</label>
          <input type="checkbox" name='ishavemoto_mander' id='ishavemoto_mander' onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label htmlFor="ishavecar_mander" className="form-checkbox">Is have a Car?:</label>
          <input type="checkbox" name='ishavecar_mander' id='ishavecar_mander' onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label htmlFor="isactive_mander" className="form-checkbox">Is Active?:</label>
          <input type="checkbox" name='isactive_mander' id='isactive_mander' onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label htmlFor="isvalidate_mander" className="form-checkbox">Is Validate?:</label>
          <input type="checkbox" name='isvalidate_mander' id='isvalidate_mander' onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear Mander</button>
      </form>
      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
};

export default ManderForm;
