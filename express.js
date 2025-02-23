const express = require("express")
const app = express();


const users = [{
   name: "John",
   kidneys: [{
      healthy: false,
   }]
}];

app.use(express.json());

app.get("/",function(req,res){
    const johnKidneys = users[0].kidneys;
    const numberofKidneys = johnKidneys.length;
    let numberofHealthykidneys = 0;


   for(let i =0 ; i<johnKidneys.length; i++){
      if(johnKidneys[i].healthy){
         numberofKidneys = numberofHealthykidneys + 1;
      }
   }
   const numberofunhealthykidneys = numberofKidneys - numberofHealthykidneys;
   res.json({
      numberofKidneys,
      numberofHealthykidneys,
      numberofunhealthykidneys
   })
})  


app.post("/" , function(req,res){
   const isHealthy = req.body.isHealthy;
   users[0].kidneys.push({
      healthy: isHealthy,
   }) 
   res.json({
      msg: "Done!",
   })

})


app.put("/", function(req,res){
   for(let i =0 ; i<users[0].kidneys.length; i++){
      users[0].kidneys[i].healthy = true;
   }
   res.json({});
})

app.delete("/", function(req,res){
   if(atonekidney()){
      const newkidneys = [];
    for(let i = 0 ; i<users[0].kidneys.length; i++){
      if(users[0].kidneys[i].healthy){
         newkidneys.push({
            healthy: true
         })
      }
    }
    users[0].kidneys = newkidneys;
    res.json({msg: "done"})
   } else{
      res.status(411).json({
         msg: "You have no bad kidneys"
      });
   }
    
})

function atonekidney(){
   let atleastonekidney = false;
   for(let i = 0; i<users[0].kidneys.length;i++){
      if(!users[0].kidneys[i].healthy){
         atleastonekidney = true;
      }
   }
   return atleastonekidney
}
app.listen(3000);