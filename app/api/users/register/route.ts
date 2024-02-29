import { dbConnect } from "../../../lib/db.js";
import { NextResponse, NextRequest } from "next/server";

const express = require('express')
const axios = require("axios")
const geo = require("geolib")
const app = express()
const Projet = require("../../src/models/Projet.js");
const Tache = require("../../src/models/Tache.js");
const Salarie = require("../../src/models/Salarie.js");
const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentification = require("../../src/middlewares/authentification");
const { Connectdb } = require("../../src/services/mongoose");
const { connect } = require("mongoose")

export async function POST(req:NextRequest,res){
    try {
        const A = await dbConnect();
        const parametre = req.nextUrl.searchParams;
        const data = await req.json();

        const MDPCrypte = await new Promise((resolve, reject) => {
            crypt.hash(data.password, 8, async (err, hash) => {
                if(err){
                    reject(err)
                }else{
                    resolve(hash)
                }
            })
        });

        const user = new Salarie({
            _id:parseInt(Math.random() * (10000000000000 - 0) + 0),
            nom: data.nom,
            Prenom: data.prenom,
            MDP: MDPCrypte
        });
        const saveUser = await user.save();
        return NextResponse.json({ User: saveUser });
    
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            reponse: "Nous n'avons pas pu créer le compte en raison d'un possible conflit avec des informations d'identification existantes ou d'une autre erreur. Veuillez réessayer avec d'autres informations"
        });
    }
    

}