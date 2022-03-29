const express = require("express");
const app = express();
const {register,login} = require("./controller/singInAndSingup");
require("dotenv").config()
var jwt = require("jsonwebtoken");

const passport = require("./config/google.outh")


const productdata = require("./controller/post.controller");

app.use(express.json())

app.use("/post",productdata)

app.post("/register",register);
app.post("/login",login)


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile',"email"] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false}),
  function(req, res) {
    userdata = req.user
    var token = jwt.sign({ userdata }, process.env.key);

    return res.status(200).send({user:req.user,token:token})
  });

module.exports = app;