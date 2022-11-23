const express = require ("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const items = require("./models/registers");


require("./db/conn.js");

const port = process.env.PORT || 8000;

app.set("view engine","hbs");

// app.set ("views",path.join(__dirname,"views"));
const static_path = path.join(__dirname,"../public");

app.use(express.static(static_path));


const template_path = path.join(__dirname,"../templates/views");
app.set("views",template_path);

const partial_path = path.join(__dirname,"../templates/partials")
hbs.registerPartials(partial_path);

app.use(express.json());
app.use(express.urlencoded({extended :true}));


app.get("/",(req,res)=>{
    // res.send ("hello hello ");
    res.render("index.hbs")
})

app.get("/register",(req,res)=>{
    res.render("register.hbs");

})
app.post("/register",async(req,res)=>{
    try{
    //    res.send(req.body.firstname);
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if(password===cpassword){
        const data = items({
            firstname :req.body.firstname,
            lastname : req.body.lastname,
            email:req.body.email,
            phonenumber:req.body.phonenumber,
            password : req.body.password,
            cpassword : req.body.cpassword
            

        })
        const datasave = await data.save();
        res.status(201).render("index")


    }
    else{
        res.send("pass not matching")
    }

    }
    catch(error){
        res.send(error);
    }

})
app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",async(req,res)=>{
    try{
        const email_login = req.body.email;
        const password_login =req.body.password;
       
        
        const login_details = await items.findOne({email:email_login}) ;
        // console/log(login_details);
        

    if(login_details.password === password_login){
            res.render("index");

        }
        else{
            res.send("invalid details");
        }
    }
    catch(e){
        res.send("error ")
    }
})

app.listen(port,(req,res)=>{
    console.log(`connection is established at ${port}`);
})

