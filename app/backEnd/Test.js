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
    res.send("Création du projet finis !")
})

app.post("/creationTache",(req,res)=>{
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
  res.send("Création de la tache finis !")
})

app.delete("/SupprimerTache/:id",async (req,res)=>{
  await Tache.findByIdAndDelete(req.params.id);
  res.send("La tache a été effacer avec succés");
})

app.patch("/ModifierEtatTache/:id",async (req,res)=>{
      const data = req.body
      await Tache.findByIdAndUpdate(req.params.id,{etat:data.etat});
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










