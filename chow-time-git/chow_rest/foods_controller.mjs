import 'dotenv/config';
import * as foods from './foods_model.mjs'; 
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new food
 */
 app.post('/foods', (req, res) => {
    foods.createFood(req.body.name, req.body.calories, req.body.servings, req.body.type, req.body.date)
               
        .then(food => {
            if(food !== null){
                        res.status(201).json(food)
                        } else {
                            // console.log('error caught')
                            res.status(400).json({ Error: 'Invalid request'})
                        }
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Invalid request'})
        })
});


/**
 * Retrive the food corresponding to the ID provided in the URL.
 */
 app.get('/foods/:_id', (req, res) => {
    const foodId = req.params._id;
    foods.findFoodById(foodId)
        .then(food => { 
            if (food !== null) {
                res.json(food);  // res.status(200).json(food);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});

/**
 * Retrieve foods. 
 */
 app.get('/foods', (req, res) => {
    let filter = {};
    if(req.query.name !== undefined){
        filter = { name: req.query.name };
    }
    foods.findFoods(filter, '', 0)
        .then(foods => {
            // res.send(foods);
            res.status(200).json(foods);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});

/**
 * Update the food whose id is provided in the path parameter and set
 * its parameters to the values provided in the body.
 */
 app.put('/foods/:_id', (req, res) => {

    foods.replaceFood(req.params._id, req.body.name, req.body.calories, req.body.servings, req.body.type, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, calories: req.body.calories, servings: req.body.servings, type: req.body.type, date: req.body.date });
            } 
            else if (numUpdated === 0) {
                
                res.status(404).json({ Error: 'Resource not found' });
            }
            else if (numUpdated === null) {
        
                res.status(400).json({ Error: 'Request failed' });
                
            }
        })

        .catch(error => {
            
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the food whose id is provided in the query parameters
 */
 app.delete('/foods/:_id', (req, res) => {
    foods.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});