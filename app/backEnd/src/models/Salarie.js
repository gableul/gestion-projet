const mongoose = require("mongoose");

const Salarie = mongoose.model("Salarie",{

    _id:{
        type:Number
    },

    nom:{
        type:String,
        
    },

    Prenom:{
        type:String
    },

    MDP:{
        type:String
    }

});

module.exports = Salarie;