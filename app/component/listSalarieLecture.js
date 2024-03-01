"use client"
import React, { useState } from 'react';
let liste_avec_id = []
function ListSalarieLecture(props){
    const [selectLecture, setSelectLecture] = useState("");
    const {lecture} = props;
    const {setlecture} = props;

    const handleLectureChange = (e) => {
        const selectedValue = e.target.value;
        if (!lecture.includes(selectedValue)) {
          setlecture([...lecture, selectedValue]);
          liste_avec_id.push(parseInt(e.target.value))
          setSelectLecture(selectedValue);
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
        Lecteur:
                    <select
                        value={selectLecture}
                        onChange={handleLectureChange}
                    >
                      <option>Selectionner</option>
                           {props.liste_salarie && props.liste_salarie.map((item)=>(
                <option value={item._id}>{item.nom}  {item.Prenom}</option>
            ))}
                    </select>
                    <br></br>
                    <div>
                    {lecture.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectLecture && liste.map((selected) => (
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

export default ListSalarieLecture;