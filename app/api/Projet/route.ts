import { dbConnect } from "../../lib/db.js";
import { NextResponse,NextRequest } from "next/server";

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



export async function GET(req:NextRequest){
    const A = await dbConnect();
    const parametre  = req.nextUrl.searchParams

    const data1 = await Projet.find({Ecriture: {$in:[parametre.get("id")]}});
    const data2 = await Projet.find({Lecteur: {$in:[parametre.get("id")]}});
    let liste = [];
    let liste_sans_doublon = [];
    let liste_with_id = [];
    if(data1.length == 0){
      liste = data2
    }if(data1.length != 0 && data2.length == 0){
  
      liste = data1
    }else{
      console.log("ca rente par la")
      liste = [...data1,...data2]
    }
  
    for(let i =0;i<liste.length;i++){
        if(i ==0){
          liste_sans_doublon.push(liste[i])
          liste_with_id.push(liste[i]._id)
        }else{
          if(!liste_with_id.includes(liste[i]._id)){
              liste_sans_doublon.push(liste[i])
              liste_with_id.push(liste[i]._id)
          }
        }
    }
  

    return NextResponse.json({
        data:liste_sans_doublon
    })
}