import React, { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import "./httpCat.css"



export function HttpCat()
{
    const [img, setImg] = useState();
    const [statusCode, setStatusCode] = useState(404)
    const [isClicked, setIsCliked] = useState(false);
    const HTTPCATURL = `https://http.cat/${statusCode}`
  
    
    useEffect(() => {
        (async  () => {
            console.log("call fetch image")
            setImg(HTTPCATURL)
            setIsCliked(false)
        })();
      }, [isClicked]);
    
    return(
        <>
            <div className="row bg-white d-flex justify-content-center">
                <div className="col-xl-3 col-md-4 col-sm-5 mt-4 col-6">
                    <input type="text" className="form-control mb-2" placeholder="404" 
                    id="Httpcode" aria-describedby="basic-addon1" value={statusCode}
                    onChange={(e) => setStatusCode(e.target.value)}
                    />
                    <label for="Httpcode" className="mb-4">Http code</label>
                    <button className="btn btn-info  pl-4 ms-4" onClick={() => setIsCliked(true)}>Chamar</button>
                </div>
                <div class="col-12 d-flex justify-content-center">
                    <img src={img} className="http-cat-image"></img>
                </div>
        
            </div>
        </>
    )
}