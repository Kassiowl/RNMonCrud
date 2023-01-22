
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const userModel = require("../../models/User");
const mongoose = require("mongoose");

module.exports = class DbConnect
{
   
    constructor()
    {
        const USERNAMEDB = process.env.MONGOUSER
        const PASSWORDDB = process.env.MONGOPASS
        const CLUSTERNAME = process.env.MONGOCLUSTER
        const DBNAME = process.env.DBNAME
        const DB_URI=`mongodb+srv://${USERNAMEDB}:${PASSWORDDB}@${CLUSTERNAME}.mongodb.net/${DBNAME}?retryWrites=true&w=majority`
        console.log("DB_URI______________")
        console.log(DB_URI)
        mongoose.connect(
            DB_URI, 
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }
          );
        
    }
    async dbGetData(name)
    {
        try {
          const users = await userModel.find({'name':name});
          return users
        } catch (error) {
          return 0
        }
    }
    async dbPostData(userArg, passwordArg, emailArg, nameArg, lastNameArg)
    {

        const userM = new userModel({username:userArg,password:passwordArg, email:emailArg, firstName:nameArg, lastName:lastNameArg});
        try {
            await userM.save();
            return 1
          } catch (error) {
            console.log("DB POST ERROR_________");
            console.log(error);
            return 0
          }
    }

    async dbDeleteData(idArg)
    {
      try
      {
        await userModel.deleteOne({_id:idArg})
        return 1
      }
      catch(error)
      {
        console.log("DB DELETE ERROR_________________");
        console.log(error)
        return 0
      }
    }

    async dbUpdateData(userId, userArg, passwordArg, emailArg, nameArg, lastNameArg)
    {
      const update = {username: userArg, password: passwordArg, email: emailArg, name: nameArg, lastName: lastNameArg}
      const filter = userId
      try
      {
        await userModel.findOneAndUpdate(filter, update)
        return 1
      }
      catch(error)
      {
        console.log("DB UPDATE ERROR___________________")
        console.log(error)
        return 0
      }
      
    }

    async dbGetAllUsers()
    {
      const users = await userModel.find();
      return users
    }
}