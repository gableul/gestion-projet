const mongoose = require("mongoose");

const Trajet = mongoose.model("Trajet",{

    _id:{
        type:Number
    },

    nom:{
        type:String,
        
    },

    matiere:{
        type:String
    },

    Points:{
        type:Array,
        
    },

    Jour:{
        type:String,
        
    }

});

module.exports = Trajet;