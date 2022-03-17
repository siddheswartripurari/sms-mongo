var express = require('express');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vitap');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var sms = express()


sms.use(bodyParser.json());
sms.use(express.static('public'));
sms.use(bodyParser.urlencoded({
   extended: true
}));

sms.post('/sign_up', function(req,res){
   var name = req.body.name;
   var regno = req.body.regno;
   var school = req.body.school;
   var branch = req.body.branch;
   var sex = req.body.sex;
   var residence = req.body.residence;
   var admittedyear = req.body.admittedyear;
   // var CGPA = req.body.c;

   var data = {
   	"Name" : name,
   	"Regno" : regno,
   	"School_Name" : school,
   	"Branch" : branch,
   	"Gender" : sex,
   	"Residence" : residence,
   	"Admitted_year" : admittedyear
      // "CGPA" : CGPA
   }


      db.collection('student').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Data inserted Successfully");
   });
   return res.redirect('success.html');
})

sms.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

console.log("server running at port 3000");


