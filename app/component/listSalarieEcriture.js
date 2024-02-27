"use client"
import React, { useState } from 'react';
const axios = require("axios")

function ListSalarieEcriture(props){
    const [selectEcriture, setSelectEcriture] = useState("");
    const {setecriture} = props;
    const {ecriture} = props;

    const handleEcritureChange = (e) => {
        const selectedValue = e.target.value;
        if (!ecriture.includes(selectedValue)) {
          setSelectEcriture(selectedValue);
          setecriture([...ecriture, selectedValue]);
        }
      };
      const getNomById = async(id) => {
        const data = await axios.get("http://localhost:3003/GetNom/"+id);
        return data[0];
      };

      const Liste_salarie_avec_nom = () =>{
        let liste = []
        for(let i =0;i<props.liste_salarie.length;i++){
            liste.push({id:props.liste_salarie._id,nom:props.liste_salarie.nom,prenom:props.liste_salarie.Prenom});
        }
        console.log(liste)
        return liste
      }

      const liste = Liste_salarie_avec_nom();



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
                                    {ecriture.map((selected) => (
                                        <tr key={selected}>
                                            <td>{selected}</td>
                                            <td></td>
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