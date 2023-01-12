
const mongoose = require('mongoose');
function mongoConnect(uri)
{
    mongoose.connect(
        uri, 
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
}

module.exports = {  mongoConnect    }