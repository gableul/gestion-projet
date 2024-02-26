"use client"
import React, { useState } from 'react';

function ListSalarieEcriture(props){
    const [selectEcriture, setSelectEcriture] = useState("");
    const [ecriture, setEcriture]= useState([]);

    const handleEcritureChange = (e) => {
        const selectedValue = e.target.value;
        if (!ecriture.includes(selectedValue)) {
          setSelectEcriture(selectedValue);
          setEcriture([...ecriture, selectedValue]);
        }
      };
      const getNomById = (id) => {
        const selectedSalarie = props.liste_salarie.find((item) => item._id === id);
        return selectedSalarie ? selectedSalarie.nom : '';
      };

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
                                            <td>{getNomById(selected)}</td>
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