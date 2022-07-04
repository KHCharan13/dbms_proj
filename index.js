const express = require("express");
const bodyParser =require("body-parser");
const mongoose = require("mongoose");
const { raw } = require("body-parser");
const { stringify } = require("nodemon/lib/utils");
const app = express();
const bcrypt = require('bcrypt');
const { redirect, render } = require("express/lib/response");

app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/newDB',{ // DATA BASE NAME ID MENTIONED HERE """""" newDB
    useNewUrlParser : true,
    useUnifiedTopology : true
    
    });
//default model of clg schema
const clgitems={
    clgname : String,
    location :String,
    website : String,
    branch : String,
    typeofclg : String
    };
//default data
var College = mongoose.model("clgs",clgitems);
//inserting data into database and displaying them
app.get("/12", function(req,res) {

    College.find({},function(err,foundItems){
       
        res.render("clg",{ data: foundItems});  
    
    })  
    
});
//geting data from the add new page 
app.post("/12",function(req,res){
    
    var cname=req.body.newItem1;
    var loc =req.body.newItem2;
    var link =req.body.newItem3;
    var course =req.body.newItem4;
    var type = req.body.newItem5;
    var newit ={
        clgname : cname,
        location : loc,
        website : link,
        branch : course,
        typeofclg: type
    }
    College.insertMany(newit,function(err){
        if (err){
            console.log(err);
        }else
        {    console.log("sucess fully added ")
        }
    });

    res.redirect('/12');
})

//default  model of university schema
const unithings={
    uniname : String,
    uniloc :String,
    website : String,
    cutoff: Number,
    branch : String,
    examtype : String,
    course: String
    };
//default data in the university 
const University = mongoose.model("universitys",unithings);

//adding data into the uni database and displaying them
app.get("/uni", function(req,res) {

    University.find({},function(err,foundUni){
        
            
        res.render("uni",{ data: foundUni});  
        }
    )  
    
});
//getting data from the add new page 
app.post("/uni",function(req,res){
   var cname=req.body.newUniversity1;
    var loc =req.body.newUniversity2;
    var cutof =req.body.newUniversity3;
    var Branch=req.body.newUniversity4;
    var clgtype=req.body.newUniversity5;
    var Website=req.body.newUniversity6;
    var Coures=req.body.newUniversity7;
    var newit ={
        uniname : cname,
        uniloc : loc,
        cutoff : cutof,
        branch : Branch,
        examtype :clgtype,
        website: Website,
        course:Coures
    }
    University.insertMany(newit,function(err){
        if (err){
            console.log(err);
        }else
        {    console.log("sucess fully added ")
        }
    });

    res.redirect('/uni');
})
app.post("/login",function(req,res){

    var Userid=req.body.userid;
    var Pass=req.body.psw;
    var userdata ={
        userid: Userid,
        password:Pass
    }  
    
    User.find({userid : Userid ,password : Pass},function(err,found){
        //if logged in 
        if(found.length != 0)
        {   
            if(Userid === "Admin")
            {
                res.render("admin",{data : userdata})
            }
            else{
            res.render("user",{data : userdata,})
            }
        }else{
            var temp = 0
            res.render("login",{data1:temp});
        }
    })
})

//user adding data
var userschema=new mongoose.Schema( {
    userid:{ 
        type: String, 
        unique: true }, 
    email: String,
    password:String
});
var User = mongoose.model("users",userschema);
//adding users into db
app.post("/signup", function(req,res){

    var Userid=req.body.userid;
    var Email=req.body.email;
    var Pass=req.body.psw;
    var Repass=req.body.repsw;
    if(Pass === Repass)
    {
        var userdata ={
            userid: Userid,
            email:Email,
            password:Pass
        }  
        User.insertMany(userdata,function(err){
            if (err){
                var data1 =1
                res.render("signup",{data1:data1});
            }
            else{
                var data1 =2;
                console.log("Data is added sucessfully")
                res.render("user",{data : userdata,})
            }
        })
    }
    else{
        var data1 =0;
        res.render("signup",{data1:data1});
    }
})
app.get("/addnew", function(req,res){
    
    res.render("addnew");
})
app.get("/login", function (req,res){
    var temp =1
    res.render("login",{data1:temp});
})
app.get("/", function (req,res){
    
    res.redirect("index.html");
})
app.get("/uni", function (req,res){
    
    res.render("uni");
})
app.get("/signup",function(req,res){
    var temp =2;
    res.render("signup",{data1:temp});
})

app.listen(3000, function(){
    console.log("server has started at 3000");
})

app.post("/searchname", function(req,res) {

University.find({uniname:req.body.name},function(err,foundItems){
{
            
        res.render("result",{ data: foundItems});  
        }
    })  
    
});

app.post("/searchloc", function(req,res) {

    University.find({uniloc:req.body.loca},function(err,foundItems){
    {
                
            res.render("result",{ data: foundItems});  
            }
        })  
        
    });

    app.post("/searchcutoff", function(req,res) {
        var Cutoff = req.body.cutof
        University.find({cutoff:{ $lte:Cutoff} ,examtype:req.body.exam},function(err,foundItems){
        {
                    
                res.render("result",{ data: foundItems});  
                }
            })  
            
        });
    

        app.post("/clgname", function(req,res) {

            College.find({clgname:req.body.name},function(err,foundItems){
            {
                        
                    res.render("result1",{ data: foundItems});  
                    }
                })  
                
            });
            
            app.post("/clgloc", function(req,res) {
            
               College.find({location:req.body.loca},function(err,foundItems){
                {
                            
                        res.render("result1",{ data: foundItems});  
                        }
                    })  
                    
                });
            
                app.post("/type", function(req,res) {
            
                    College.find({typeofclg:req.body.exam},function(err,foundItems){
                    {
                                
                            res.render("result1",{ data: foundItems});  
                            }
                        })  
                        
                    });
                
app.get("/search",function(req,res){

    res.render("search")
})
app.get("/addeng",function(req,res){
    
    res.render("addeng",{data :2});
})
var eng=new mongoose.Schema( {
    clgname : String, 
    cse : Number,
    ece : Number,
    eee : Number,
    mech : Number,
    ise : Number,
    civil : Number
});
var Eng = mongoose.model("Eng",eng);
app.post("/addeng", function(req,res){

    var Clg=req.body.Name;
    var Cse=req.body.cse;
    var Ece=req.body.ece;
    var Eee=req.body.eee;
    var Mech=req.body.mech;
    var Ise=req.body.ise;
    var Civil= req.body.civil;
    
    
        var engdata ={
           clgname : Clg,
           cse : Cse,
           ece : Ece,
           eee : Eee,
           mech : Mech,
           ise : Ise,
            civil : Civil
        }
          
        Eng.insertMany(engdata,function(err){
            if (err){
                var data= 0;
                console.log("Not Added Sucessfully");
                res.render("addeng",{data:data});
            }
            else{
               var data = 1;
                console.log("Data is added sucessfully")
                res.render("addeng",{data:data});
            }
        })
    })
    app.post("/updateeng", function(req,res){

        var Clg=req.body.Name;
        var Cse=req.body.cse;
        var Ece=req.body.ece;
        var Eee=req.body.eee;
        var Mech=req.body.mech;
        var Ise=req.body.ise;
        var Civil= req.body.civil;
        
        
            var engdata ={
               clgname : Clg,
               cse : Cse,
               ece : Ece,
               eee : Eee,
               mech : Mech,
               ise : Ise,
                civil : Civil
            }
              
            Eng.updateMany(engdata,function(err){
                if (err){
                    var data= 0;
                    console.log("Not Added Sucessfully");
                    res.render("addeng",{data:data});
                }
                else{
                   var data = 1;
                    console.log("Data is added sucessfully")
                    res.render("addeng",{data:data});
                }
            })
        })
    
var med=new mongoose.Schema( {
    clgname : String, 
    mbbs : Number,
    md : Number,
    bpt : Number,
   
});
var Med = mongoose.model("meds",med);
app.post("/addmed", function(req,res){

    var Clg=req.body.Name;
    var Mbbs= req.body.mbbs;
    var Md=req.body.md;
    var Bpt = req.body.bpt;
   
        var Meddata ={
           clgname : Clg,
           mbbs : Mbbs,
           md : Md,
           bpt : Bpt
                   }
          
        Med.insertMany(Meddata,function(err){
            if (err){
                var data= 0;
                console.log("Not Added Sucessfully");
                res.render("addmed",{data:data});
            }
            else{
               var data = 1;
                console.log("Data is added sucessfully")
                res.render("addmed",{data:data});
            }
        })
    })

    app.get("/addmed",function(req,res){
        res.render("addmed",{data : 2})
    })

    app.post("/updatemed", function(req,res){

        var Clg=req.body.Name;
        var Mbbs= req.body.mbbs;
        var Md=req.body.md;
        var Bpt = req.body.bpt;
       
            var Meddata ={
               clgname : Clg,
               mbbs : Mbbs,
               md : Md,
               bpt : Bpt
                       }
              
            Med.updateMany(query,Meddata,function(err,found){
                if (err){
                    var data= 0;
                    console.log("Not Added Sucessfully");
                    res.render("updatemed",{data:data});
                }
                if(found){
                   var data = 1;
                    console.log("Data is added sucessfully")
                    res.render("updatemed",{data:data});
                }
            })
        })
        app.get("/updateeng",function(req,res){
            res.render("updateeng",{data :2});
        })
    app.get("/updatemed",function(req,res){
        res.render("updatemed",{data :2});
    })
    app.get("/engseats", function(req,res) {

        Eng.find({},function(err,foundItems){
            
                
            res.render("engseats",{ data: foundItems});  
           
        })  
        
    });
    app.get("/medseats", function(req,res) {

        Med.find({},function(err,foundItems){
            
                
            res.render("medseats",{ data: foundItems});  
           
        })  
        
    });