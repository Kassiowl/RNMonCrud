import { useState } from "react";
export function UserUpdate()
{


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("")
    const [message, setMessage] = useState("")
    const [userId, setUserId] = useState("")
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:3001/updateUser", {
              
            headers: {
              'Content-Type': 'application/json'
                },
            method: "PATCH",
            body: JSON.stringify({
              userId: userId,
              username: username,
              password: password,
              email: email,
              name: name,
              lastName: lastname
            }),
          });
          if (res.status === 200) {
            setUsername("");
            setPassword("");
            setName("");
            setLastname("");
            setEmail("");
            setMessage("User update successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };

    return(
        <div>
            <form className="form" onSubmit={handleSubmit}>  
            <div class="">
                <label for="user-id" class="form-label">inser user id to update</label>
                <input type="text" class="form-control" id="user-id" onChange={(e) => setUserId(e.target.value)}/>
            </div>
            <div class="">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div class="">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div class="">
                <label for="email" class="form-label">email</label>
                <input type="text" class="form-control" id="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div class="">
                <label for="name" class="form-label">name</label>
                <input type="text" class="form-control" id="name" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div class="">
                <label for="last-name" class="form-label">last name</label>
                <input type="text" class="form-control" id="last-name" onChange={(e) => setLastname(e.target.value)}/>
            </div>
            <button type="submit" class="btn btn-success mt-4">Update User</button>
            <div className="message mt-2">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    )
}