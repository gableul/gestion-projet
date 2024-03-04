"use client"
import React, { useState } from 'react';

function ChefProjet(props){
    const {Chef} = props;
    const {setChef} =props
    const handleSubmit=()=>{

    }
    return(
        <form onSubmit={handleSubmit} >
         Chef de Projet:
         <br></br>
          <select
            value={Chef}
            onChange={(e) => setChef(e.target.value)}
          >
            <option>Selectionner</option>
            {props.liste_salarie && props.liste_salarie.map((item)=>(
                <option value={item._id}>{item.nom}  {item.Prenom}</option>
            ))}
            
          </select>
        </form>
    );
}

export default ChefProjet;