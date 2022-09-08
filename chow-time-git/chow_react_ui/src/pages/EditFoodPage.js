import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditFoodPage = ({ foodToEdit }) => {

 // state variables for each of the inputs
 const [name, setName] = useState(foodToEdit.name);
 const [calories, setCalories] = useState(foodToEdit.calories);
 const [servings, setServings] = useState(foodToEdit.servings);
 const [type, setType] = useState(foodToEdit.type);
 const [date, setDate] = useState(foodToEdit.date);

 const history = useHistory();

 const editFood = async () => {
     const editedFood = {name, calories, servings, type, date};
     const response = await fetch(`/foods/${foodToEdit._id}`, {
         method: 'PUT',
         body: JSON.stringify(editedFood),
         headers:{
             'Content-Type': 'application/json',
         }, // method required, sent body and headers as part of the http request to say what is being sent is json
     });
     if(response.status === 200){
         alert("Successfully edited the food");
     } else{
         alert(`Failed to edit food, status code = ${response.status}`);
     }
     history.push("/");
 };

 return (
     <div>
         
         <h1>Edit Food</h1>
         <thead>
                <tr>
                    <th>Name</th>
                    <th>Calories</th>
                    <th>Servings</th>
                    <th>Type</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    
                <td>
                    <input
                type="text"
                placeholder="Food Name"
                value={name}
                onChange={e => setName(e.target.value)} />
                </td>

                <td>
                    <input
                type="number"
                placeholder="Number of Calories"
                value={calories}
                onChange={e => setCalories(e.target.value)} />
                </td>

                <td>
                    <input
                type="number"
                placeholder="Servings"
                value={servings}
                onChange={e => setServings(e.target.value)} />
                </td>

                <td>
                    <select
                type="text"
                value={type}
                onChange={e => setType(e.target.value)}>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snacks">Snacks</option>
                 </select>
                
                </td>
                
                <td>
                    <input
                type="text"
                placeholder="Date: MM-DD-YY"
                value={date}
                onChange={e => setDate(e.target.value)} />
                </td>

                </tr>
            </tbody>
            <p></p>
         <button
             onClick={editFood}
         >Save</button>

         
     </div>   
 );
}

export default EditFoodPage;