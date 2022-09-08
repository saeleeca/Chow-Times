import React from 'react';
import Food from './Food';

// passing down onDelete from parent to child components
function FoodList({ foods, onDelete, onEdit }) {
    return (
        <table id="foods">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Calories</th>
                    <th>Servings</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {foods.map((food, i) => <Food food={food}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default FoodList;
