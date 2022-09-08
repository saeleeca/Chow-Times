import React from 'react';
// import { Link } from 'react-router-dom';
import FoodList from '../components/FoodList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setFoodToEdit }) {
    const [foods, setFoods] = useState([]);
    const history = useHistory();
    

    // onDelete uses a filter to only display the id of foods that do not match given id, effectively deleting given id/foods
    const onDelete = async _id => {
        const response = await fetch(`/foods/${_id}`, {method: 'DELETE'});
        if(response.status === 204){
            setFoods(foods.filter(m => m._id !== _id)); 
        } else{
            console.error(`Failed to delete food with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = food => {
        setFoodToEdit(food);
        console.log(food);
        history.push("/edit-food");

    }

    const loadFoods = async () => {
        const response = await fetch('/foods');
        const data = await response.json();
        setFoods(data);
    }
    
    // useEffect calls a function, and that function calls the fetch API which makes http request
    // the function we pass to useEffect as first parameter cannot be async in useEffect
    useEffect(() => {
        loadFoods();
    }, []);

    // we pass down onDelete and onEdit here to the child components
    return (
        <>
            <h2>List of Foods</h2>
            <FoodList foods={foods} onDelete={onDelete} onEdit={onEdit}></FoodList>
            
            
        </>
    );
    
}

export default HomePage;