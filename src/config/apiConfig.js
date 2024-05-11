//Para Uso con Docker
var protocol = window.location.protocol;
var host = window.location.host;
// var apiUrl = protocol + '//' + host + ':8000';
//// const apiUrl = 'http://localhost:8000';
//Para uso con backend desplegado en Azure
//const apiUrl = 'https://manders.azurewebsites.net';
//Para uso con backend desplegado en Azure2
const apiUrl = 'https://mandaderos.azurewebsites.net';
//Para uso con backend desplegado en Azure3
//const apiUrl = 'https://mandaderos3.azurewebsites.net';
//para uso local
//const apiUrl = 'http://127.0.0.1:8000'

export default apiUrl;