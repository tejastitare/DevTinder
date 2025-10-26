const express = require("express");

const app = express();


app.use("/user",(req,res)=>{
    res.send("User Created");
})
app.get("/user",(req,res)=>{
    res.send({name:"Tejas", age:28, city:"New York"});
})

app.post("/user",(req,res)=>{
    res.send("User created successfully!");
})
app.use("/test", (req, res) => {
  res.send("Hello from the Server!");
});

app.delete("/user",(req,res)=>{
    res.send("User deleted successfully!");
})
// app.use("/", (req, res) => {
//   res.send("Hello Hello Hell!");
// });
app.listen(7777, () => console.log("Server is running on port 7777"));
