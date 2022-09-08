import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddFoodPage from './pages/AddFoodPage';
import EditFoodPage from './pages/EditFoodPage';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {
  const [foodToEdit, setFoodToEdit] = useState();
  console.log(foodToEdit);
  return (
    <div className="App">
      
      <Router>
      
        <div className="App-header">
        <h1 className='Header'>Chow-Times</h1>
      <p>A full stack MERN Application for chow time!</p>
      
        <Navigation />
          <Route path="/" exact>
            <HomePage setFoodToEdit={setFoodToEdit}/>
          </Route>
          <Route path="/add-food">
            <AddFoodPage />
          </Route>
          <Route path="/edit-food">
            <EditFoodPage foodToEdit={foodToEdit} />
          </Route>
          </div>
      </Router>
      <footer> © 2022 Calvin Saelee</footer>
    </div>
    
  );
}

export default App;