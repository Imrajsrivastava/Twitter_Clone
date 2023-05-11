const express  = require("express");
const app = express();
const port = 3003;
const midlewear = require("./midlewear");
const path = require("path");
const bodyParser = require("body-parser")

const server = app.listen(port,()=>console.log("server runig at port",port));

app.set("view engine","pug")
app.set("views","views")
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,"public")));

const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoute")


app.use("/login",loginRoute);
app.use("/register",registerRoute);


app.get("/",midlewear.requireLogin,(req,res,next)=>{

  var payload={
    pageTitle:"Home"
  }
  res.status(200).render("home",payload);
})