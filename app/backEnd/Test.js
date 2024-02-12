const polyline = require("./polyline.js")
const express = require('express')
const axios = require("axios")
const geo = require("geolib")
const app = express()
const port = 3001;
const Trajett = require("./src/models/Trajet.js");
const Projet = require("./src/models/Projet.js");
const Salarie = require("./src/models/Salarie.js");
const { Connectdb } = require("./src/services/mongoose");
const { connect } = require("mongoose")

//url: `https://wps.hereapi.com/v8/findsequence2?start=Maison;48.913205009379,2.523774030862&destination1=Lagny;48.877627289,2.705573581&end=Hugo;48.915134984495,2.531670035111&improveFor=time&departure=2023-12-09T09:30:00%2b01:00&mode=fastest;car;traffic:enabled`


app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  Connectdb();


})
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
      return res.sendStatus(200);
  }
  next();
});



app.get("/test",async (req,res)=>{
  const NewAgence= new Salarie(
    {
      _id: parseInt(Math.random() * (10000000000000 - 0) + 0),
      nom: "Gabriel",
      Prenom:"lebg",

    }
  )
  NewAgence.save();
  const NewAgenc= new Salarie(
    {
      _id: parseInt(Math.random() * (10000000000000 - 0) + 0),
      nom: "Bogo",
      Prenom:"Chat",

    }
  )
  NewAgenc.save();

});

app.get("/Salarie",async (req,res)=>{
  const data = await Salarie.find();
  res.send({salarie:data})
})

app.post("/:nom/:description/:chef",(req,res)=>{
  console.log(req.body)
    const data = req.body
    const project = new Projet(
      {
        _id:parseInt(Math.random() * (10000000000000 - 0) + 0),
        nom:req.params.nom,
        Description:req.params.description,
        Chef_Projet:req.params.chef,
        Ecriture:data.Ecriture,
        Lecteur:data.Lecture
      }
    )
    project.save();
    res.send("tout va bien")
})











