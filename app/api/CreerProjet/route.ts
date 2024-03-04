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
    data.Ecriture.push(parametre.get("chef"));
    data.Lecture.push(parametre.get("chef"));
   
    const project = new Projet(
      {
        _id:parseInt(Math.random() * (10000000000000 - 0) + 0),
        nom:parametre.get("nom").toString(),
        Description:parametre.get("description").toString(),
        Chef_Projet:parametre.get("chef").toString(),
        Ecriture:data.Ecriture,
        Lecteur:data.Lecture
      }
    )
    project.save();
    return NextResponse.json({
        reponse:"Création du projet finis !"
    })
}