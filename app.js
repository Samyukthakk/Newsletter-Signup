const express= require("express");
const https=require("https");
const request=require("request");
require('dotenv').config({path : 'vars/.env'});
const MAPI_KEY = process.env.API_KEY
const MLIST_ID = process.env.LIST_ID
const MAPI_SERVER = process.env.API_SERVER
const port = process.env.PORT || 3000;

const app=express();


app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
  const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
    const data= {
      members:[{
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname

        }
      }]
    };
    const jsonData=JSON.stringify(data);
    const url="https://"+MAPI_SERVER+".api.mailchimp.com/3.0/lists/"+ MLIST_ID
    const options={
      method:"POST",
      auth:"sai:"+ MAPI_KEY
    };
  const request=  https.request(url,options,function(response){

  if(response.statusCode==200){
    res.sendFile(__dirname+"/success.html")
  }  else{
      res.sendFile(__dirname+"/failure.html")
  }
 response.on("data",function(data){
  console.log(JSON.parse(data));
})
    })

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res) {
  res.redirect("/")
})



app.listen(port,function() {
  console.log("server port 3000 is running")

})


//api key
//7d889a719972a7f329cbfca5a3ba586e-us21

//aud id
//9b8791a5a1

//server prefix
//https://us21.admin.mailchimp.com/
