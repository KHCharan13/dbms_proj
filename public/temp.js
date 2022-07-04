
//signup
const userdetails={
    userid : String,
    email : String,
    psw : String
    };
    const User= mongoose.model("users",userdetails);
app.post("/signup",function(req,res){
    var Uid= req.body.userid;
    var Email =req.body.userid;
    var Password=req.body.psw;
    var Repassword=req.body.repsw;

    if( Password === Repassword)
    {
        res.redirect("/");
    }
    else
    {   
        res.redirect("/failed.html"); 
        
    }
})