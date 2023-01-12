
import blank_avatar from "./blank_avatar.jpg"
import "./dashboard.css"
import React, { useEffect, useState } from "react";
import {  LoadingSpinner  } from "./spinner" 
import ReactPaginate from "react-paginate";


  
function PersonData()
{
 
    const [person, setPerson] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    


    const randomPerson = () =>
    {
        return fetch('http://localhost:3001/random_user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
        .then(data => data.json())
        .then((personData) =>
        {
            console.log(personData)
            person.fullname = personData.results[0].name.first + ' ' + personData.results[0].name.last;
            person.email = personData.results[0].email;
            person.username = personData.results[0].login.username
            person.age = personData.results[0].dob.age
            person.avatar = personData.results[0].picture.thumbnail
            console.log("person________________________________")
            console.log(person)
        })      
    };

    useEffect(() =>
    {
      (async  () => {
        setIsLoading(true);
        await randomPerson()
        setIsLoading(false)
    })();

        
    },[])

    if(!person.avatar)
    {
      return(
        <div class="col-xl-6 col-md-12 col-sm-12 col-xs-12">
           <div class="m-1 d-flex justify-content-center">
              <LoadingSpinner />
           </div>
        </div>
      )
    }
    return(
    
        <div class="col-xl-6 col-md-12 col-sm-12 col-xs-12">
            <div class="row border border-black m-1">
                <img src={person.avatar} className="avatar rounded col-xl-1 col-md-6 col-sm-12 col-xs-12"/>
                <div className="col-10-xl col-md-6">
                    <p className="person-info">Nome completo:  {person.fullname}</p>
                    <p className="person-info">E-mail: {person.email}</p>
                    <p className="person-info">username {person.username}</p>
                    <p className="person-info">idade {person.age}</p>
                    <button class="btn btn-success btn-sm m-2">Adicionar usuario ao data base</button>
                </div>
            </div>
        </div>
    )

}

export default function DashBoard()
{
    const allPerson = [];

    const [person, setPerson] = useState()


    useEffect(() => {
      for(let i = 0; i < 100; i++)
      {
          allPerson.push(<PersonData />)
      }
    }, [allPerson])

    const [currentPersons, setCurrentPersons] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [personsOffSet, setPersonsOffset] = useState(0);

    useEffect(() => {
      const endOffset = personsOffSet + 8;
      setCurrentPersons(allPerson.slice(personsOffSet, endOffset));
      setPageCount(Math.ceil(allPerson.length / 8));
    }, [personsOffSet, person])

    const handlePageClick = (event) => {
      const newOffset = (event.selected * 8) % allPerson.length;
      console.log("new off set")
      console.log(newOffset)
      setPersonsOffset(newOffset);
      setPerson(newOffset)
    };
 

    return(
        <div className="border border-success container-fluid">
              <div class="row bg-white">
                <h1>DashBoard</h1>
                  <div class="row">
                  <input class="form-control m-4 col-xl-10 col-xs-12 w-25" type="search" placeholder="Pesquisar..." aria-label="Pesquisar usuário" ></input>
                </div>
                <div className="pagination">
                  <ReactPaginate 
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                </div>
                  {currentPersons}
                </div>
        </div>
    )
}