const mongoose = require("mongoose")
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useUnifiedTopology",true)
// mongoose.set("useFindAndModify",false)
// mongoose.set("useUnifiedTopology",true)

class Database {

    constructor(){
        this.connect();
    }

  connect(){
    mongoose.connect("mongodb+srv://rajsri4485:Satyam@12345@twittercluster.spekg3w.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("connection successful")
})
.catch((error)=>{
    console.log("error"+ error)
})
  }

}
module.exports = new Database();