"use client"
import React, { useState } from 'react';
const axios = require("axios")
let liste_avec_id = []

function ListSalarieEcriture(props){
    const [selectEcriture, setSelectEcriture] = useState("");
    const {setecriture} = props;
    const {ecriture} = props;



    const handleEcritureChange = (e) => {
        const selectedValue = e.target.value;
        if (!ecriture.includes(selectedValue)) {
          setSelectEcriture(selectedValue);
          setecriture([...ecriture, selectedValue]);
          liste_avec_id.push(parseInt(e.target.value))
          setSelectEcriture(selectedValue);
        }
      };


      const Liste_salarie_avec_nom = () =>{
        let liste = []
        for(let i =0;i<props.liste_salarie.length;i++){
            liste.push({id:props.liste_salarie[i]._id,nom:props.liste_salarie[i].nom,prenom:props.liste_salarie[i].Prenom});
        }
        return liste
      }
      const Liste_avec_nom = Liste_salarie_avec_nom()
      const liste = Liste_avec_nom.filter((element) => {return liste_avec_id.includes(parseInt(element.id))});



    return (
        <>
        Ecriture:
                    <select
                        value={selectEcriture}
                        onChange={handleEcritureChange}
                    >
                      <option> Selectionner</option>
                         {props.liste_salarie && props.liste_salarie.map((item)=>(
                <option value={item._id}>{item.nom}  {item.Prenom}</option>
            ))}
                    </select>
                    <div>
                    {ecriture.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectEcriture && liste.map(selected => (
                                        <tr key={selected.id}>
                                            <td>{selected.nom}</td>
                                            <td>{selected.prenom}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    )}
                    </div>
   
            

                    </>
    );
};

export default ListSalarieEcriture;