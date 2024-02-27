"use client"
import React, { useState } from 'react';

function ListSalarieLecture(props){
    const [selectLecture, setSelectLecture] = useState("");
    const {lecture} = props;
    const {setlecture} = props;

    const handleLectureChange = (e) => {
        const selectedValue = e.target.value;
        if (!lecture.includes(selectedValue)) {
          setSelectLecture(selectedValue);
          setlecture([...lecture, selectedValue]);
        }
      };
    
      const getNomById = (id) => {
        const selectedSalarie = props.liste_salarie.find((item) => item._id === id);
        return selectedSalarie ? selectedSalarie.nom : '';
      };

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
                                    {lecture.map((selected) => (
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

export default ListSalarieLecture;