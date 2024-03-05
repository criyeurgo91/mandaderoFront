import React from 'react';

function DetailUser() {
   const user = {
        "id_user": 2,
        "image_user": null,
        "name_user": "Cristian",
        "lastname_user": "Silva",
        "phone_user": "3188694094",
        "dateregister_user": "2024-03-05T02:23:05.137881Z",
        "dateupdate_user": "2024-03-05T02:23:05.137881Z",
        "ismander_user": false,
        "account_id_account": 1
    };
    const vehicles = [
        {
            "id_vehicle": 1,
            "image_vehicle": "http://127.0.0.1:8000/media/imgVehicles/NS_1005775_P_3008187.png",
            "brand_vehicle": "Honda",
            "plate_vehicle": "IBL-92F",
            "model_vehicle": "2021",
            "color_vehicle": "Azul",
            "type_vehicle": "bike",
            "isverified_vehicle": false,
            "dateregister_vehicle": "2024-03-05T04:18:25.312166Z",
            "dateupdate_vehicle": "2024-03-05T04:18:25.312166Z",
            "dateverified_vehicle": "2024-03-05T04:18:25.312166Z",
            "user_id_user": 2
        }
    ];
    const documents = [
        {
            "id_document": 1,
            "image_document": "http://127.0.0.1:8000/media/imgDocs/NS_10057735_P_3008183.png",
            "isdocument_vehicle": true,
            "isverified_document": true,
            "type_document": "CC",
            "dateregister_document": "2024-03-05T05:57:45.862345Z",
            "dateupdate_document": "2024-03-05T05:57:45.862345Z",
            "dateverified_document": "2024-03-05T00:57:00Z",
            "user_id_user": 3
        }
    ];

    const requests = [
        {
            "id_request": 5,
            "detail_request": "Traer PC",
            "status_request": "Pendiente",
            "dateregister_request": "2024-03-05T05:58:30.611013Z",
            "dateupdate_request": "2024-03-05T05:58:30.611013Z",
            "service_id_service": 1,
            "user_id_user": 2
        }
    ];

    return (
        <div className="container mx-auto">
            {/* Encabezado de la página */}
            <h2 className="text-2xl font-bold mb-4">Detail User</h2>

            {/* Pestañas */}
            <div className="mb-4">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    User Info
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Vehicles, Documents & Requests
                </button>
            </div>

            {/* Contenido de las pestañas */}
            {/* Pestaña de información del usuario */}
            <div className="border p-4 mb-4">
                <h3 className="text-xl font-bold mb-2">User Information</h3>
                {/* Mostrar la información del usuario */}
                <p>Name: {user.name_user}</p>
                <p>Lastname: {user.lastname_user}</p>
                <p>Phone: {user.phone_user}</p>
                {/* Botón para editar */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Edit
                </button>
            </div>

            {/* Pestaña de vehículos */}
            <div className="border p-4 mb-4">
                <h3 className="text-xl font-bold mb-2">Vehicles</h3>
                {/* Mostrar la información de los vehículos */}
                {vehicles.map(vehicle => (
                    <div key={vehicle.id_vehicle}>
                        <p>Brand: {vehicle.brand_vehicle}</p>
                        <p>Plate: {vehicle.plate_vehicle}</p>
                        {/* Otros campos de información del vehículo */}
                    </div>
                ))}
            </div>

            {/* Pestaña de documentos */}
            <div className="border p-4 mb-4">
                <h3 className="text-xl font-bold mb-2">Documents</h3>
                {/* Mostrar la información de los documentos */}
                {documents.map(document => (
                    <div key={document.id_document}>
                        <p>Type: {document.type_document}</p>
                        {/* Otros campos de información del documento */}
                    </div>
                ))}
            </div>

            {/* Pestaña de solicitudes */}
            <div className="border p-4 mb-4">
                <h3 className="text-xl font-bold mb-2">Requests</h3>
                {/* Mostrar la información de las solicitudes */}
                {requests.map(request => (
                    <div key={request.id_request}>
                        <p>Detail: {request.detail_request}</p>
                        {/* Otros campos de información de la solicitud */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetailUser;
