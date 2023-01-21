import logout from "./logout"
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import logo from "./logo.png"
import '@fortawesome/fontawesome-free-solid'
import "./navbar.css"
import { NavLink } from "react-router-dom";
import * as React from "react";
import 'bootstrap/dist/js/bootstrap.bundle';


export default function Navbar()
{
  return(
          <nav className="navbar navbar-expand-lg nav-bg">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand" href="#">
              <NavLink to="/">
                <img src={logo} className="nav-logo"></img>
              </NavLink>
              </a>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page">
                    <NavLink to="/cat"   
                        className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "") + " nav-anchor"
                        }>
                        Cat Api
                    </NavLink>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                    <NavLink to="/userView"   
                        className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "") + " nav-anchor"
                        }>
                          Visualizar usuários
                    </NavLink>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                    <NavLink to="/userInsert"   
                        className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "") + " nav-anchor"
                        }>
                          Inserir Usuários
                    </NavLink>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                    <NavLink to="/userUpdate"   
                        className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "") + " nav-anchor"
                        }>
                          Atualizar usuários
                    </NavLink>
                    </a>
                  </li>
                </ul>
                <button className="btn btn-success btn-lg" onClick={logout} >
                          <FontAwesomeIcon icon="fa-solid fa-door-open" />
                </button>
              </div>
            </div>
          </nav>
    )
}