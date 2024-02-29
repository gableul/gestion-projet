import { dbConnect } from "../../lib/db.js";
import { NextResponse, NextRequest } from "next/server";

const express = require('express')
const axios = require("axios")
const geo = require("geolib")
const app = express()
const Projet = require("../src/models/Projet.js");
const Tache = require("../src/models/Tache.js");
const Salarie = require("../src/models/Salarie.js");
const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentification = require("../src/middlewares/authentification");
const { Connectdb } = require("../src/services/mongoose");
const { connect } = require("mongoose")

export async function POST(req:NextRequest){
    const A = await dbConnect();
    const parametre  = req.nextUrl.searchParams
    const data = await req.json();
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
    return NextResponse.json({
        reponse:"Création de la tache finis !"
    })
}