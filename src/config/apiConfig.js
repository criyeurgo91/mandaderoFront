//Para Uso con Docker
var protocol = window.location.protocol;
var host = window.location.host;
var apiUrl = protocol + '//' + host + '8000';
//const apiUrl = 'http://localhost:8000';
//Para uso con backend desplegado en Azure
//const apiUrl = 'https://manders.azurewebsites.net';

export default apiUrl;