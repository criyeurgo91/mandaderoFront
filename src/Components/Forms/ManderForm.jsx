import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';


function ManderForm({ onCreate, onClose }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [isMander, setIsMander] = useState(false);
  const [address, setAddress] = useState('');
  const [cc, setCc] = useState('');
  const [ishavecar, setIshavecar] = useState(false);
  const [ishavemoto, setIshavemoto] = useState(false);
  const [isactivemander, setIsactivemander] = useState(false);
  const [isvalidatemander, setIsvalidatemander] = useState(false);
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  


  useEffect(() => {
    // Aquí puedes realizar cualquier acción que necesites cuando se monte el componente
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accountResponse = await axios.post(`${apiUrl}/api/account/`, {
        email_account: email,
        password_account: password,
        isadmin_account: isAdmin ? isAdmin : false, // Utiliza la variable 'isAdmin' directamente
      });

      const accountId = accountResponse.data.id_account;

      // Crear un objeto FormData para el user
      const formData = new FormData();
      formData.append('account_id_account', accountId);
      formData.append('image_user', image);
      formData.append('name_user', name);
      formData.append('lastname_user', lastname);
      formData.append('phone_user', phone);
      formData.append('ismander_user', isMander);

      const userResponse = await axios.post(`${apiUrl}/api/user/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Indicar que se envía una imagen
        },
      });

      const userId = userResponse.data.id_user

      //crear un objeto para el mander
      const formDataMander = new FormData()
      formDataMander.append('user_id_user', userId)
      formDataMander.append('image_mander', image)
      formDataMander.append('ishavecar_mander', ishavecar)
      formDataMander.append('ishavemoto_mander', ishavemoto)
      formDataMander.append('isactive_mander', isactivemander)
      formDataMander.append('address_mander', address)
      formDataMander.append('cc_mander', cc)

      const manderResponse = await axios.post(`${apiUrl}/api/mander/`, formDataMander, {
        headers: {
          'Content-Type': 'multipart/form-data', // Indicar que se envía una imagen
        },
      });

      const manderId = manderResponse.data.id_mander

      setMessage('Mander created successfully.');

      // Limpiar los campos después de enviar el formulario
      setEmail('');
      setPassword('');
      setImage(null);
      setName('');
      setLastname('');
      setPhone('');
      setIsMander(false);
      setAddress('')
      setCc('')
      setIshavecar(false)
      setIshavemoto(false)
      setIsvalidatemander(false)
      setIsactivemander(false)

      
      
      // Llamar a la función onCreate para actualizar la lista de usuarios
      onCreate();

      // Llamar a la función onClose para cerrar el formulario después de una creación exitosa
      onClose();

    } catch (error) {
      setMessage('Error creating Mander. Please try again.');
      console.error('Error creating Mander:', error);
    }
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setErrorPassword('La contraseña debe tener entre 8 y 20 caracteres.');
    }else{
      setErrorPassword('')
    } 
    
  };

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(newEmail)) {
      setErrorEmail("ingresa un correo electrónico válido");
    }else{
      setErrorEmail('')
    }
  };

  const handleChangePhone = (event) => {
    const newphone = event.target.value;
    setPhone(newphone);

    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(newphone)) {
      setErrorPhone("ingresa un numero de telefono valido");
    }else{
      setErrorPhone('')
    }
  };

  const handleChangeImage = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    // Mostrar la vista previa de la imagen
    const imageUrl = URL.createObjectURL(selectedImage);
    setPreviewImage(imageUrl);
  };

  return (
    <div className="container mx-auto">
      
      <h1 className="text-3xl font-bold mb-4 text-center">Crear Mander</h1>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">

        {/* Campos para la cuenta */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={handleChangeEmail}
            required
            
          />
          {errorEmail && <p className="text-red-500">{errorEmail}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            minLength={8}
            maxLength={20}
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={handleChangePassword}
            required
          />
          {errorPassword && <p className="text-red-500">{errorPassword}</p>}
        </div>
        {/* Campos para el usuario */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
            Lastname:
          </label>
          <input
            id="lastname"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone:
          </label>
          <input
            id="phone"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={phone}
            onChange={handleChangePhone}
            required
          />
          {errorPhone && <p className="text-red-500">{errorPhone}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='isMander'
              name='isMander'
              className="form-checkbox"
              checked={isMander}
              onChange={(event) => setIsMander(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is Mander?</span>
          </label>
        </div>

        {/* Campo para la imagen */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_mander">
          Image:
        </label>
        <input
          id="image_mander"
          type="file"
          className="w-full px-3 py-2 border rounded-md"
          onChange={handleChangeImage}
          accept="image/*"
        />
        {/* Vista previa de la imagen */}
        {previewImage && (
          <img src={previewImage} alt="Preview" className="w-24 h-24 mb-4 mt-4 object-cover rounded-full" style={{ maxHeight: '200px' }} />
        )}
      </div>

        {/* Campos para el mandadero */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cc_mander">
            Document Number:
          </label>
          <input
            id="cc_mander"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={cc}
            onChange={(event) => setCc(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addresss_mander">
            Address:
          </label>
          <input
            id="address_mander"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='ishavemoto'
              name='ishavemoto'
              className="form-checkbox"
              checked={ishavemoto}
              onChange={(event) => setIshavemoto(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is have a Bike?</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='ishavecar'
              name='ishavecar'
              className="form-checkbox"
              checked={ishavecar}
              onChange={(event) => setIshavecar(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is have a Car?</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='isactivemander'
              name='isactivemander'
              className="form-checkbox"
              checked={isactivemander}
              onChange={(event) => setIsactivemander(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is Active?</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='isvalidated'
              name='isvalidated'
              className="form-checkbox"
              checked={isvalidatemander}
              onChange={(event) => setIsvalidatemander(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is Validated?</span>
          </label>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mb-2">
          Crear Mander
        </button>
        <button type="reset" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
        onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ManderForm;
