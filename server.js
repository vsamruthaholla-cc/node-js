const express = require("express");
const hbs = require("hbs");
const fs = require('fs')
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs')
app.use(express.static(__dirname + "/public"));
app.use((req, res, next)=>{
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`
   console.log(log);
   fs.appendFileSync("record.log", log + '\n', (err)=>{
       if(err){
           console.log("unable to connect");
       }
   })
    next(); 
})

// app.use((req, res, next)=>{
//     res.render("maintenance.hbs")
// })

hbs.registerHelper("getCurrentYear", ()=>{ 
    return new Date().getFullYear()})
hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase();
})

app.get('/', (req,res)=>{
    //res.send('<h1>Hello Express</h1>');
    res.render("main.hbs",{
        pageTitle: "Welcome To This Page",
        message: "Hello"
    })
});
app.get("/about", (req,res)=>{
    res.render("about.hbs",{
        pageTitle: "About Page",
        
    })
});
app.get("/bad", (req,res)=>{
    res.send({
        error:"Error page"
    });
})

app.listen(3000);