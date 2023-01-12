import './App.css';
import './login.css';
import LoginPage from './login';
import DashBoard from './dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import useToken from './useToken';
import Navbar from "./navbar"
import { HttpCat } from './HttpCat';
import { UserView } from './UserView';
import { UserInsert } from "./UserInsert";
import { UserUpdate } from "./UserUpdate";
import { UserDelete } from "./UserDelete";



function App() {

  const { token, setToken } = useToken();

  if(!token)
  {
    return <LoginPage setToken={setToken}/>
  }
  return (
    <div className="wrapper">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<DashBoard/>}></Route>
          <Route exact path="/cat" element={<HttpCat />}></Route>
          <Route exact path="/userView" element={<UserView />}></Route>
          <Route exact path="/userInsert" element={<UserInsert />}></Route>
          <Route exact path="/userDelete" element={<UserDelete />}></Route>
          <Route exact path="/userUpdate" element={<UserUpdate />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
