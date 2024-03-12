"use client"
import React, { useState } from 'react';
import "../styles/tableaux/global.css"
const axios = require("axios")
let liste_avec_id = []


function ListSalarieEcriture(props) {
    const [selectEcriture, setSelectEcriture] = useState("");
    const { setecriture, ecriture } = props;
    const [liste_avec_id, setListeAvecId] = useState([]);

    const handleEcritureChange = (e) => {
        const selectedValue = e.target.value;
        if (!ecriture.includes(selectedValue)) {
            setSelectEcriture(selectedValue);
            setecriture([...ecriture, selectedValue]);
            setListeAvecId([...liste_avec_id, parseInt(e.target.value)]);
        }
    };

    const handleDelete = (id) => {
        const updatedEcriture = ecriture.filter((item) => item != id);
        setecriture(updatedEcriture);
        setListeAvecId(liste_avec_id.filter((item) => item != id));
    };

    const Liste_salarie_avec_nom = () => {
        let liste = []
        for (let i = 0; i < props.liste_salarie.length; i++) {
            liste.push({ id: props.liste_salarie[i]._id, nom: props.liste_salarie[i].nom, prenom: props.liste_salarie[i].Prenom });
        }
        return liste
    }
    const Liste_avec_nom = Liste_salarie_avec_nom()
    const liste = Liste_avec_nom.filter((element) => liste_avec_id.includes(parseInt(element.id)));

    return (
        <>
            <div className="titreSelect">Ecriture : </div>
            <select
                value={selectEcriture}
                onChange={handleEcritureChange}
            >
                <option> Selectionner</option>
                {props.liste_salarie && props.liste_salarie.map((item) => (
                    <option value={item._id}>{item.nom} {item.Prenom}</option>
                ))}
            </select>
            <br />
            <div>
                {ecriture.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectEcriture && liste.map(selected => (
                                <tr key={selected.id}>
                                    <td>{selected.nom}</td>
                                    <td>{selected.prenom}</td>
                                    <td>
                                        <button class="delete-button" onClick={() => handleDelete(selected.id)}>X</button>
                                    </td>
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
