import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import UserList from '../../Components/User/UserList'
import Sidebar from '../../Components/Navbar/Sidebar';

const UserView = () => {
ReactDOM.render(
  <Router>
    <UserList/>
    <Sidebar/>
  </Router>,
  document.getElementById('root')
);
}

export default UserView
