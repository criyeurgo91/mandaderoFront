import React from "react";
import Createuser from '../User/CreateUser'
import UserView from '../User/UserView'
import UpdateUserForm from '../../Components/Forms/UpdateUserForm'
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../Home/index';

function App() {
  return (
    <Router>
      <UserView />
    </Router>
  );
}

export default App




