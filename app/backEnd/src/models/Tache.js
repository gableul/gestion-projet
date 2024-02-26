const mongoose = require("mongoose");

const Tache = mongoose.model("Tache",{

    _id:{
        type:Number
    },

    titre:{
        type:String,
        
    },

    description:{
        type:String
    },

    effort:{
        type:Number
    },

    etat:{
        type:Number
    },

    id_projet:{
        type:Number
    }

});

module.exports = Tache;