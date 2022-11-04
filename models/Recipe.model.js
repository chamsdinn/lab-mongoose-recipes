const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('../data');
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy" , "Amateur Chef" ,"UltraPro Chef"],
  },
  ingredients:{
    type: [String],
  },
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    default: "breakfast, main_course, soup, snack, drink, dessert ,other",
  },
  image:{
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator:{
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

mongoose
  .connect("mongodb://127.0.0.1/MongooseRecipes")
  .then(async(db)=>{
    try{
      console.log("connected to ", db.connection.name)

      await Recipe.deleteMany();

      const newRecipe = await Recipe.create({
          title: "chef",
          level: "Easy Peasy",
          ingredients: "olive, tomato sauce, flour, tuna",
          cuisine: "pizza",
          dishType: "main_course",
          image: "",
          duration: 80,
          creator: "jean paul",

      });
      console.log(newRecipe);

      
      const allRecipe = await Recipe.insertMany(data); 

      console.log(allRecipe);

      const updateRecipe= await Recipe.findOneAndUpdate(
        {duration: 100},
      )
        console.log("success", updateRecipe);

      const removeRecipe = await Recipe.deleteOne({
        title: "Carrot Cake",
      })

      console.log("removed", removeRecipe);

      await mongoose.disconnect()
    } catch (error) {
      console.error(error);}
  })
  .catch((error) => console.error(error));

module.exports = Recipe;
