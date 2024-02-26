"use client"
import React, { useState } from 'react';

function ChefProjet(props){
    const [chefprojet, setChefProjet] = useState('');
    return(
        <>
         Chef de Projet:
          <select
            value={chefprojet}
            onChange={(e) => setChefProjet(e.target.value)}
          >
            <option>Selectionner</option>
            {props.liste_salarie && props.liste_salarie.map((item)=>(
                <option value={item._id}>{item.nom}  {item.Prenom}</option>
            ))}
            
          </select>

        </>
    );
}

export default ChefProjet;