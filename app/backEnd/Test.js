const express = require('express')
const axios = require("axios")
const app = express()
const port = 3003;
const Projet = require("./src/models/Projet.js");
const Tache = require("./src/models/Tache.js");
const Salarie = require("./src/models/Salarie.js");
const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentification = require("./src/middlewares/authentification");
const { Connectdb } = require("./src/services/mongoose");
const { connect } = require("mongoose");
const { userAgent } = require('next/server.js');

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
      MDP:"Azerty"
    }
  )
  NewAgence.save();
});

app.get("/Salarie",async (req,res)=>{
  const data = await Salarie.find();
  res.send({salarie:data})
})

app.get("/Projet",async(req,res)=>{
    const data = await Projet.find();
    res.send({projet:data});

})

app.post("/creerProjet/:nom/:description/:chef",(req,res)=>{
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
    console.log("Finis")
    res.send("Création du projet finis !")
})

app.post("/creationTache",async (req,res)=>{
  const data = req.body
  const tache = new Tache(
    {
      _id:parseInt(Math.random() * (10000000000000 - 0) + 0),
      titre:data.titre,
      description:data.descrip,
      effort:data.effort,
      etat:data.etat,
      id_projet:data.idP
    }
  )
  tache.save();

  let tache_projet = await Projet.findById(data.idP)
  tache_projet.Taches.push(tache._id)
  await Projet.findByIdAndUpdate(data.idP,{Taches:tache_projet.Taches})
  console.log("finis creation tache")
  res.send("Création de la tache finis !")
})

app.delete("/SupprimerTache/:id",async (req,res)=>{
  await Tache.findByIdAndDelete(req.params.id);
  res.send("La tache a été effacer avec succés");
})

app.patch("/ModifierEtatTache/:id",async (req,res)=>{
      const data = req.body
      console.log(data.etat+"  dfdz")
      await Tache.findByIdAndUpdate(req.params.id,{etat:data.etat});
      console.log("Modification etat fini")
      res.send("Modification de l'etat terminé");

})


app.post("/users/login", async (req, res, next) => {
  try {
      const user = await Salarie.findOne({ nom: req.body.nom });
      crypt.compare(req.body.password, user.MDP, async (err, result) => {
          if (result) {
              var token = jwt.sign({ _id: user._id }, "foo");
              user.AuthTokens = token;
              await user.save();
              res.send({ user: { prenom: user.prenom, nom: user.nom, id: user._id }, token });
          } else {
              res.status(400).json({ message: "Mauvais mot de passe" });
          }
      });
  } catch (e) {
      res.status(404).json({ message: "Not found: Compte n'existe pas, veuillez en créer un " });
  }
});

app.post("/users/register", async (req, res, next) => {

  crypt.hash(req.body.password, 8, async (err, hash) => {
      try {
          req.body.password = hash;
          const user = new Salarie({
              _id:parseInt(Math.random() * (10000000000000 - 0) + 0),
              nom: req.body.nom,
              Prenom: req.body.prenom,
              MDP: req.body.password
          });
          const saveUser = await user.save();
          res.send(saveUser);
      } catch (e) {
          res.status(401).json({ message: "Nous n'avons pas pu créer le compte en raison d'un possible conflit avec des informations d'identification existantes ou d'une autre erreur. Veuillez réessayer avec d'autres informations" });
      }
  });

});

app.get("/GetNom/:id",async (req,res)=>{
    const data = await Salarie.findById(req.params.id);
    res.send({salarie:data[0]})
})

app.get("/Projet/:id",async (req,res) =>{
  const data1 = await Projet.find({Ecriture: {$in:[req.params.id]}});
  const data2 = await Projet.find({Lecture: {$in:[req.params.id]}});
  let liste = [];
  if(data1.length == 0){
    liste = data2
  }else{
    liste = data1
  }

  res.send(liste);
})

app.get("/ProjetbyId/:id",async (req,res) =>{
  const data = await Projet.find({_id:req.params.id})
  res.send(data);
})

app.post("/TachebyId",async (req,res) =>{
  const listeIDTache = req.body.liste;
  let liste_Tache = [];
  if(listeIDTache.length == 1){
      const data  = await Tache.findById(listeIDTache[0])
      res.send(data[0]);
      return
  }else{
      for(let i =0;i<listeIDTache.length;i++){
        const data  = await Tache.findById(listeIDTache[0])
        liste_Tache.push(data[0]);
      }
      res.send(liste_Tache)

  }
})

app.get("/Droit/:IdProjet/:IdUser",async (req,res) => {
    const data = await Projet.findById(req.params.IdProjet);
    let Droit_lecteur = false
    let Droit_Chef = data.Chef_Projet == req.params.IdUser
    if(data.Lecteur.includes(req.params.IdUser)){
        Droit_lecteur = true;
    }

    res.send({Lecteur:Droit_lecteur,Chef:Droit_Chef})
})

app.get("/Tache/:id",async (req,res) =>{

    const data = await Projet.findById(req.params.id);

    res.send(data.Taches);
})










