
const fetch = require('node-fetch')

module.exports = class GetUser
{
    getRandomUser()
    {
        return fetch('https://randomuser.me/api/')
        .then((response) => { 
            return response.json().then((data) => {
                return data
            }).catch((err) => {
                console.log(err);
            }) 
        });
        return 0

    }   
}