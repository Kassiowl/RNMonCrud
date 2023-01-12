import React, { useState } from "react";
import logo from "./logo.png"
import PropTypes from 'prop-types';




async function loginUser(credentials) {
  return fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

function LoginBox( {  setToken  } )
{
  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [errorMessage, setErrorMessage] = useState()

  const handleSubmit = async e => {
    e.preventDefault();
    try
    {
      const token = await loginUser({
        username,
        password
      });
      setToken(token);
    }
    catch(error)
    {
      setErrorMessage("username or password is incorrect")
    }
  }
    return(
        <section className="vh-100 login-bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xxl-6 col-md-12 col-xs-12 col-sm-12 text-black">
                  <div className="px-5 ms-xxl-4">
                    <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"/>
                    <span className="logo h1 fw-bold mb-0"><img className="img-logo" src={logo} /></span>
                  </div>
                  <div className="d-flex h-custom-2 px-sm-5 ms-xs-4 mt-sm-5 pt-sm-5 pt-xl-0 mt-xl-n5 bg-white login-div">
                    <form style={{width: '35rem'}} onSubmit={handleSubmit}>
                      <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>
                      <div className="form-outline mb-4">
                        <input type="username" id="username" className="form-control form-control-lg" onChange={ e => setUserName(e.target.value)}/>
                        <label className="form-label" htmlFor="form2Example18">username</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="password" className="form-control form-control-lg" onChange={ e => setPassword(e.target.value)}/>
                        <label className="form-label" htmlFor="form2Example28">password</label>
                        <input type="checkbox" id="rememberme" className="ms-4 form-check-input"/>
                        <label for="rememberme" className="form-label ms-1">Remember me</label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-success btn-lg btn-block" type="submit">Login</button>
                      </div>
                      <p className="small mb-5 pb-lg-2"><a className="link-success" href="#">Forgot password?</a></p>
                      <p >Don't have an account? <a href="#!" className="link-success">Register here</a></p>  
                      <p className="text-danger">{    errorMessage   }</p>
                    </form>
                  </div>
                </div>
                <div className="col-xxl-6 col-md-12 col-xs-12 col-sm-12 px-0 d-none d-sm-block solar-img-div">
                  <img src="https://wallpaperaccess.com/full/92833.jpg" alt="solar energy" className="w-100 vh-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
                </div>
              </div>
            </div>
          </section>
    )

}

export default function LoginPage( { setToken } )
{
   return(
        <LoginBox setToken= {   setToken  }/>
    );

}


LoginBox.propTypes = {
  setToken: PropTypes.func.isRequired
};
