import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddFoodPage = () => {
    // state variables for each of the inputs
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [servings, setServings] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addFood = async () => {
        const newFood = {name, calories, servings, type, date};
        const response = await fetch('/foods', {
            method: 'POST',
            body: JSON.stringify(newFood),
            headers:{
                'Content-Type': 'application/json',
            }, // method required, sent body and headers as part of the http request to say what is being sent is json
        });
        if(response.status === 201){
            alert("Successfully added the food");
        } else{
            alert(`Failed to add food, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Enter Food</h2>
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
                // value={unit}
                onChange={e => setType(e.target.value)}>
                    <option value="Choose One">Choose One</option>
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
                onClick={addFood}
            >Add!</button>
            
        </div>
    );
}

export default AddFoodPage;