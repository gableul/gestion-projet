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
    
        const user = await Salarie.findOne({ nom: data.nom });
    
        const result = await new Promise((resolve, reject) => {
            crypt.compare(data.password, user.MDP, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    
        if (result) {
            const token = jwt.sign({ _id: user._id }, "foo");
            user.AuthTokens = token;
            await user.save();
            console.log(user);
            return NextResponse.json({ user: { prenom: user.prenom, nom: user.nom, id: user._id }, token});
        } else {
            return NextResponse.json({ reponse: "mauvais mot de passe" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            reponse: "Not found: Compte n'existe pas, veuillez en créer un "
        });
    }
    

}