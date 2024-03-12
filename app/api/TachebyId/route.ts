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
    let listeIDTache = await req.json()
    let liste_Tache = [];
    if(listeIDTache.liste.length == 1){
        const data  = await Tache.findById(listeIDTache.liste[0])
        return NextResponse.json({
            data : [data]
        })
        
    }else{
        for(let i =0;i<listeIDTache.liste.length;i++){
          const data  = await Tache.findById(listeIDTache.liste[i])
          liste_Tache.push(data);
        }
        return NextResponse.json({
            data:liste_Tache
        })
  
    }

}