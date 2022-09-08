import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const foodSchema = mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },  
    servings: { type: Number, required: true }, 
    type: { type: String, required: true }, 
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Food = mongoose.model("Food", foodSchema);

const createFood = async (name, calories, servings, type, date) => {

    if(isDateValid(date) === false){
        console.log('date is not valid')
        return null
    }

    if(calories <= 0 || isNaN(calories) == true) {
        console.log('calories is not valid')
        return null
    }

    if(servings <= 0 || isNaN(servings) == true) {
        console.log('servings is not valid')
        return null
    }

    if(type !== "Breakfast" && type !== "Lunch" && type !== "Dinner" && type !== "Snacks") {
        console.log('type is not valid')
        return null
    }

    console.log('validated: true')
    const food = new Food({ name: name, calories: calories, servings: servings, type: type, date: date });
    return food.save();
};

const findFoods = async (filter, projection, limit) => {
    const query = Food.find(filter)
    .select(projection)
    .limit(limit);
    return query.exec();
};

const findFoodById = async (_id) => {
    const query = Food.findById(_id);
    return query.exec();
};

const replaceFood = async (_id, name, calories, servings, type, date) => {

    if(isDateValid(date) === false){
        console.log('date is not valid')
        return null
    }

    if(calories <= 0 || isNaN(calories) == true) {
        console.log('calories is not valid')
        return null
    }

    if(servings <= 0 || isNaN(servings) == true) {
        console.log('servings is not valid')
        return null
    }

    if(type !== "Breakfast" && type !== "Lunch" && type !== "Dinner" && type !== "Snacks") {
        console.log('type is not valid')
        return null
    }
    const result = await Food.replaceOne({ _id: _id}, { name: name, calories: calories, servings: servings, type: type, date: date });
    return result.modifiedCount
};

const deleteById = async (_id) => {
    const result = await Food.deleteOne({ _id: _id });
    return result.deletedCount;
};

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    // console.log('valiDated: ', format.test(date) )
    return format.test(date);
}

export {createFood, findFoodById, findFoods, replaceFood, deleteById};