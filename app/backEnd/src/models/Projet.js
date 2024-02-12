const mongoose = require("mongoose");

const Projet = mongoose.model("Projet",{

    _id:{
        type:Number
    },

    nom:{
        type:String,
        
    },

    Description:{
        type:String
    },
    
    Chef_Projet:{
        type:String
    },

    Ecriture:{
        type:Array,
        
    },

    Lecteur:{
        type:Array,
        
    },

    Taches:{
        type:Array,
        
    }

});

module.exports = Projet;