const express = require('express');

const mongoose=require('mongoose');

const app = express();

app.use(express.json());


const connect=()=>{

mongoose.connect("mongodb+srv://georgegid:hello1234@cluster0.9ssus.mongodb.net/test");

}

//schema

const jobsSchema=mongoose.Schema({
"id":{type:Number,require:true},
"company_name":{type:String,require:true},
"company_details":{type:String,require:true},
"job_title":{type:Number,require:true},
"work_from_home":{type:Number,require:true},
"notice_period":{type:Number,require:true},
"rating":{type:Number,require:true},
"open_jobs":{type:Number,require:true},
"city":{type:String,require:true},
"skill":{type:String,require:true}


},{

    versionKey : false,
    
});



const Alljobs=mongoose.model('jobs',jobsSchema);

//CRUD

app.get("/jobs/:city/:skill/",async(req,res)=>{

try{

  const data1= await Alljobs.find({"city":req.params.city, "skill":req.params.skill}).lean().exec();
   return res.status(201).send(data1);
}catch(e){

    return res.status(500).send({message:e.message,status: "Fail"});
}

});

app.get("/jobs/work_from_home",async(req,res)=>{

    try{

        const data2= await Alljobs.find({"work_from_home":"yes"}).lean().exec();
         return res.status(201).send(data2);
      }catch(e){
      
          return res.status(500).send({message:e.message,status: "Fail"});
      }

});


app.get("/noticep/:id",async(req,res)=>{

    try{

        const data2= await Alljobs.find({notice_period:req.params.id}).lean().exec();
         return res.status(201).send(data2);
      }catch(e){
      
          return res.status(500).send({message:e.message,status: "Fail"});
      }

});

app.get("/rating",async(req,res)=>{

    try{

        const data2= await Alljobs.find().sort({rating: -1}).lean().exec();
         return res.status(201).send(data2);
      }catch(e){
      
          return res.status(500).send({message:e.message,status: "Fail"});
      }

});

app.get("/openjobs",async(req,res)=>{

    try{

        const data2= await Alljobs.find().sort({open_jobs: -1}).limit(1).lean().exec();
         return res.status(201).send(data2);
      }catch(e){
      
          return res.status(500).send({message:e.message,status: "Fail"});
      }

});



