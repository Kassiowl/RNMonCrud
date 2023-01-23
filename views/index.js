const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const dbRepo = require('../core/Repository_impl/DbRepository');
const { db } = require("../models/User");
const getUser = require('../core/Repository_impl/GetUser');
const { get } = require("http");
const { stringify } = require("querystring");
const bcrypt = require('bcrypt');
const saltRounds = 10;


require('dotenv').config({ path: path.resolve(__dirname, '.env') })


const token_secret = "process.env.TOKENSECRET"


app.use(cors());
app.use(express.urlencoded(
  {
    extended: true
  }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function generateAccessToken(username, expiresIn) {
  return jwt.sign(username, token_secret, { expiresIn: expiresIn });
}



app.post('/login',(req,res) =>
{
  
  console.log("REQUEST_________________________");
  console.log(req.body);
  let findUser = false;
  (async () => {

    
    const db = new dbRepo()
    const dbGetData = await db.dbGetData(req.body.username)
    console.log(dbGetData)
    console.log("dbGetdatapass")
    console.log(dbGetData[0].password)
    const result = await bcrypt.compare(req.body.password, dbGetData[0].password)
    if(result)
    {
      const expireIn = 1800
      const token = generateAccessToken({ username: req.body.username},expireIn);
      res.json({token:token, expireIn:expireIn});
    }

    else
    {
      res.statusMessage = "Auth failed";
      res.status(400).end();
    }
  })();

});

app.post("/postUser", (req, res)=>
{
  console.log("REQUEST________");
  console.log(req.body);

  (async () =>
  {
   const hashedPassword  = await bcrypt.hash(req.body.password, saltRounds)
    const db = new dbRepo()
    const dbPostData = await db.dbPostData(req.body.username,hashedPassword, req.body.email, req.body.name, req.body.lastName)
    if(dbPostData)
    {
      res.status(200);
      res.send("User insert success")
    }
    else
    {
      res.status(500);
      res.send("Post failed")
    }
  })()
})

app.patch("/updateUser", (req, res)=>
{
  console.log("entrou no update_______________________");
  console.log(req.body.userId);
  (async () =>
  {
    const hashedPassword  = await bcrypt.hash(req.body.password, saltRounds)
    const db = new dbRepo()
    const dbUpdateData = await db.dbUpdateData(req.body.userId, req.body.username,hashedPassword, req.body.email, req.body.name, req.body.lastName)
    if(dbUpdateData)
    {
      console.log("update")
      res.status(200);
      res.send("User update success")
    }
    else
    {
      res.status(500);
      res.send("something went wrong");
    }
  })();
})

app.delete("/deleteUser", (req, res)=>
{
  console.log("entrou no delete user");
  console.log("reid___________________");
  console.log(req.body.id);
  (async () =>
  {
    const db = new dbRepo()
    const dbDeleteData = await db.dbDeleteData(req.body.id)
    if(dbDeleteData)
    {
      res.status(200);
      res.send("User delete success")
    }
  })();
})



app.get("/random_user", (req, res) => 
{
  user = new getUser()
  user.getRandomUser().then((data)=>
  {
    console.log(data)
    randomUserJson = data
    return res.json(data);
  })
 
});

app.get("/getUser", (req, res) =>
{
  console.log("get user____________________________________________");
  (async () => {
    const db = new dbRepo()
    const dbGetData = await db.dbGetAllUsers(req.body.username,req.body.password)
    if(Object.keys(dbGetData).length != 0)
    {
      console.log("encontrou")
      findUser = true;
    }
    if(findUser)
    {
      console.log("find user dbGetData_________________")
      console.log(dbGetData)
      res.json({userData: dbGetData});
    }
    else
    {
      res.statusMessage = "No Content";
      res.status(204).end();
    }
  })();
  
})



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

