import React, { useEffect, useState } from "react";
import {  LoadingSpinner  } from "./spinner" 
import "./Userview.css"


async function handleDelete(id)
{

  console.log("handleDeleteId")
  console.log(id)
  try {
    let res = await fetch("http://localhost:3001/deleteUser", {
        
      headers: {
        'Content-Type': 'application/json'
          },
      method: "DELETE",
      body: JSON.stringify({
        id:id
      }),
    });
    if (res.status === 200) {
      alert('Delete Successfully')
      window.location.reload()
    } else {
    }
  } catch (err) {
    console.log(err);
  }
}

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

        console.log(userData.userData[i])
        
        users.push(
          <div className="col-xl-6 col-md-12 col-sm-12 col-xs-12 border border-dark">
             <p>User id: {userData.userData[i]._id}</p>
             <p>username:  {userData.userData[i].username}</p>
             <p>password(hash):  {userData.userData[i].password}</p>
             <p>email:  {userData.userData[i].email}</p>
             <p>lastname:  {userData.userData[i].lastName}</p>
             <p>name:  {userData.userData[i].firstName}</p>
             <button className="btn btn-danger" 
                onClick={(e) => 
                {
                  handleDelete(userData.userData[i]._id)}
                }
                >
                  Delete
              </button>
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