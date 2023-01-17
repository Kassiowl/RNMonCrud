import "./userInsert.css"
export function UserInsert()
{
    return(
        <div className="d-flex justify-content-center">
            <form className="form">  
            <div class="mb-3 col-12">
                <label for="username" class="form-label">User name</label>
                <input type="text" class="form-control" id="username" aria-describedby="emailHelp" />
                <div id="usernameHElp" class="form-text">Insert username.</div>
            </div>
            <div class="mb-3 col-6">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" />
            </div>
            <div class="mb-3 col-6">
                <label for="email" class="form-label">email</label>
                <input type="text" class="form-control" id="email" />
            </div>
            <div class="mb-3 col-6">
                <label for="name" class="form-label">name</label>
                <input type="text" class="form-control" id="name" />
            </div>
            <div class="mb-3 col-6">
                <label for="last-name" class="form-label">last name</label>
                <input type="text" class="form-control" id="last-name" />
            </div>
            <button type="submit" class="btn btn-success">Inser user</button>
            </form>
        </div>
    )
}