const express= require("express")
const cors=require("cors")
const mongoose=require('mongoose');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy; 
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const Complaint = require('./models/complaints');
const User = require("./models/user");
const { createcomplaint, showcomplaints , viewcomplaint , editcomplaint , deletecomplaint , admin, getadr} = require("./controllers/complaints");
const { signUp, login } = require("./controllers/user");
// const dotenv = require("dotenv"),config();
// const dotenv = require('dotenv').config();
const app=express()
require("dotenv").config()
// const dburl = dotenv.DB_URL
const dburl = "mongodb+srv://Lokesh:Nn5lMW3FnvRxqfFX@cluster0.jhwaejt.mongodb.net/municipal?retryWrites=true&w=majority"
mongoose.connect(dburl);
const db=mongoose.connection;
db.on("error",()=>console.log("connection error:"));
db.once("open",()=>{
    console.log("Database Connected");    
});

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(session({
//     secret:"secretcode",
//     resave:true,
//     saveUninitialized:true
// }));
// app.use(cookieParser("secretcode"));
// app.use(passport.initialize());
// app.use(passport.session());


app.post("/post",createcomplaint)

app.get("/showcomplaints",showcomplaints)

app.get("/viewcomp/:id",viewcomplaint)

app.post("/editcomp/:id",editcomplaint);

app.post("/delete/:id",deletecomplaint);

app.post("/signup",signUp);

app.post("/login",login);

app.get("/admin/:id",admin);

app.get("/getadr",getadr);

app.listen(process.env.PORT ||4000,()=>{
    console.log("Port 4000")
})