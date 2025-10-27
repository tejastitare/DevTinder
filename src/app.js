const express = require("express");

const app = express();
const { adminAuth ,userAuth} = require("./middlewares/auth");
// app.use("/user",e1,[e2,e3],e4,e5,[e6,e7,e8,e9],e10);

app.use("/admin", adminAuth);

app.get(
  "/admin/getAllData",
  (req, res, next) => {
    res.send("All User Data Sent");
  },
  (req, res, next) => {
    console.log("Handling the route user 3!");
    // res.send("Hello from the User Page");
    next();
  }
);

app.get("/user",userAuth,(req,res,next)=>{
    res.send("User data sent successfully");
})

app.get(
  "/admin/deleteUser",
  (req, res, next) => {
    res.send("User deleted successfully");
  },
  (req, res, next) => {
    console.log("Handling the route user 5!");
    // next();
    res.send("Successfully handled the route user 5!");
  }
);
app.listen(7777, () => console.log("Server is running on port 7777"));
