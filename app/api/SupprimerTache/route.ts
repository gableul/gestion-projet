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

export async function DELETE(req:NextRequest){
    const A = await dbConnect();
    const parametre  = req.nextUrl.searchParams
    await Tache.findByIdAndDelete(parametre.get("id"));
    return NextResponse.json({
        reponse:"La tache a été supprimer avec succés !"
    })
}