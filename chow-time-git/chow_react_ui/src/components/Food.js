import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Food({ food, onDelete, onEdit }) {
    return (
        <tr>
            <td>{food.name}</td>
            <td>{food.calories}</td>
            <td>{food.servings}</td>
            <td>{food.type}</td>
            <td>{food.date}</td>
            <td><MdEdit onClick={ () => onEdit(food)}/></td>
            <td>< MdDeleteForever onClick={ () => onDelete(food._id)}/></td>
        </tr>
    );
}

export default Food;