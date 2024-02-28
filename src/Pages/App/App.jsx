import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import UserView from "../User/UserView"
import Sidebar from "../../Components/Navbar/Sidebar"
import LayoutComp from "../../Components/Layout/LayoutComp"


const App = () => {
  return (
    <Router>
      <div>
        <LayoutComp/>
      </div>
    </Router>
  )
}

export default App

