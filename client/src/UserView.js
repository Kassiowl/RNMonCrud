import React, { useEffect, useState } from "react";
import {  LoadingSpinner  } from "./spinner" 
import "./Userview.css"


export function UserView()
{


  const [loading, setIsLoading] = useState(true);
  let [users, setUsers] = useState({});

  const getDataUser = () => {
    return fetch('http://localhost:3001/getUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(data => data.json())
    .then((userData) =>
    {
      users.id = userData.userData[0]._id

      users.username = userData.userData[0].username
      users.password = userData.userData[0].password

      users.email = userData.userData[0].email
      users.name = userData.userData[0].name
      users.lastname = userData.userData[0].lastname
    
    })
  };
  
    useEffect(() =>
    {
      (async  () => { 
        setIsLoading(true)
        await getDataUser();
        setIsLoading(false);
      })();
        
    },[])

    if(loading)
    {
      return(
        <div class="col-xl-6 col-md-12 col-sm-12 col-xs-12 mt-4">
           <div class="m-1 d-flex justify-content-center">
              <LoadingSpinner />
           </div>
        </div>
      )
    }
    return(
      <div className="bg-white container-fluid">
        <div className="row">
          <div className="col-12">
            <h1>User View</h1>
            <p>Username: {users.username}</p>
            <p>Password: {users.password}</p>
            <p>Email: {users.email}</p>
            <p>Nome: {users.name}</p>
            <p>Ultimo nome: {users.lastname}</p>
            
          </div>
        </div>
      </div>
    )
}