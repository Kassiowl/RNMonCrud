import React, { useEffect, useState } from "react";
import {  LoadingSpinner  } from "./spinner" 
import "./Userview.css"


export function UserView()
{


  const [loading, setIsLoading] = useState(true);
  let [users, setUsers] = useState([]);

 
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
      console.log("User data________")
      for(let i = 0; i < userData.userData.length; i++)
      {

        console.log(userData.userData[i]._id)
        
        users.push(
          <div className="col-6 border border-info">
             <p>User id: {userData.userData[i]._id}</p>
             <p>username:  {userData.userData[i].username}</p>
             <p>password(hash):  {userData.userData[i].password}</p>
             <p>email:  {userData.userData[i].email}</p>
             <p>lastname:  {userData.userData[i].lastname}</p>
             <p>name:  {userData.userData[i].name}</p>
          </div>
        )
    


      }
    
    })
  };
  
    useEffect(() =>
    {
      (async  () => { 
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
            {users}

          </div>
      </div>
    )
}