// SETUp Express 
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const MongoUtil = require('./MongoUtil')
let app = express();
// enable JSOn as the transfer data format (but is this necessary for Mongo?)
app.use(express.json());
// enable CORS 
app.use(cors())
// End of SETUP 

//WAS TOLD TO REMOVE ASYNC MAIN FUNCTION //Not line 20 to 175 would be wrapped in Async Function//but it does not work going back to the original

async function main(){

    await MongoUtil.connect(process.env.MONGO_URL, "hawkerdb") //database name

//For Recipes Collection

// This is the route to retrieve all food records and display all the food records. //Reference source code in NodeJS and Express Lab  
// app.get("/recipes", async (req, res) => {
//     try {
//         let db = MongoUtil.getDB()  //This is to get the connection by calling the getDB function in MongoUtil
//         let recipes = await db.collection('recipes').find().toArray();
        
//         res.send(recipes)
//         res.status(200)
//     } catch (e) {
//         console.log(e)
//         res.status(500)
//         console.log(e)
//         res.send(
//             "Unable to get recipes"
//         )
//     }
// })   
// The above can be done 

 app.get('/recipes', async (req, res) => {
    
        
    //     //getUsers?userId=1234&name=Sam
    //     //const reqQueryObject =req.query // returns object will all parameters 
    //     //const userId = req.query.userId //returns "1234"
    //     //const name = req.query.name // returns "Billy"

     let recipes = req.query.search;
     let criteriaofsearch = {}; //object
    //     // null results => false 
    //     //undefined results => false 
    //     //"" => false 
       if (recipes) {
    //         //if food is not null, and not defined and not empty string 
    //         //proceed to add it to the critera

    //         //understanding : https://docs.mongodb.com/manual/reference/operator/query/regex/
    //         //$regex provides regular expression capabilities for pattern matching strings in queries 
    //         //option i : case insensitivity to match upper and lower cases 
    //         //there are other options to use for matching check later 

             criteriaofsearch['recipes'] = { //when you pass in the item to be searched 
                 '$regex': recipes,
                 '$options': 'i'

          }
      }
    //     // fetch all the search occurrences from database and send back
         let db = MongoUtil.getDB();
         let results = db.collection('recipes').find(criteriaofsearch).toArray();
    //     //if req.query.search is a, then it is same as db.collection('a').find("hawkerfood":{$regex:"chicken","$options":"i"})
       res.send(results);
         res.status(200)
     // console.log("line 85")- tested and appears
     }) //end of get



    //POST a Recipe URL
    //so where is this URL? //Assuming it to be collection name
    app.post("/recipes", async (req, res) => {
        try {
            let db = MongoUtil.getDB()  //This is to get the 
            let recipe_name = req.body.recipe_name;
            let course = req.body.course;
            let cuisine = req.body.cuisine;
            let history = req.body.history;
            let description = req.body.description;
            let ingredient_part_1 = req.body.ingredient_part_1;
            let ingredient_part_2 = req.body.ingredient_part_2;
            let ingredient_part_3 = req.body.ingredient_part_3;
            let preparation_method = req.body.preparation_method;
            let preparation_time = req.body.preparation_time;
            let cooking_method = req.body.cooking_method;
            let cooking_time = req.body.cooking_time;
            let serving_size = req.body.serving_size;
            let recipe_contributor = req.body.recipe_contributor;
            let source_of_recipe = req.body.source_of_recipe;
            let date = new Date(date); //create an ISO Data Object from String 
            let img_url = req.body.img_url

            res.send(result);
            //send back status (HTTP code)
            res.status(200);
            console.log("working")
        } catch (e) {
            res.send("Unexpected internal server error");
            res.status(500);
            console.log(e)
        } //end of catch 
    }) //end of post

   

    //edit function 

    app.put('/recipes/:id', async (req, res) => {
        //retrieval of data from the website
        let recipe_name = req.body.recipe_name;
        let course = req.body.course;
        let cuisine = req.body.cuisine;
        let history = req.body.history;
        let description = req.body.description;
        let ingredient_part_1 = req.body.ingredient_part_1;
        let ingredient_part_2 = req.body.ingredient_part_2;
        let ingredient_part_3 = req.body.ingredient_part_3;
        let preparation_method = req.body.preparation_method;
        let preparation_time = req.body.preparation_time;
        let cooking_method = req.body.cooking_method;
        let cooking_time = req.body.cooking_time;
        let serving_size = req.body.serving_size;
        let recipe_contributor = req.body.recipe_contributor;
        let source_of_recipe = req.body.source_of_recipe;
        let date = new Date(date); //create an ISO Data Object from String 
        let img_url = req.body.img_url;

        let db = MongoUtil.getDB();
        let results = await db.collection('recipes').updateOne({
            "_id": ObjectId(req.params.id)
        }, {

            //20thMayVideo refer about $set
            "$set": {
                "recipe_name": recipe_name,
                "course": course,
                "cuisine": cuisine,
                "history": history,
                "description": description,
                "ingredient_part_1": ingredient_part_1,
                "ingredient_part_2": ingredient_part_2,
                "ingredient_part_3": ingredient_part_3,
                "preparation_method": preparation_method,
                "preparation_time": preparation_time,
                "cooking_method": cooking_method,
                "cooking_time": cooking_time,
                "serving_size": serving_size,
                "recipe_contributor": recipe_contributor,
                "source_of_recipe": source_of_recipe,
                "date": date,
                "img_url": img_url
            }
        })
        res.status(200)
        res.send(results);

    }) //end of put

//delete function
//https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/
app.delete("/recipes/:id", async(req,res)=>{
    
    try{
        await db.collection('recipes').deleteOne({
    _id: ObjectId(req.params.id)
}) 
res.status(200);
res.send(
   "Deleted Recipe"
)
} catch(e){
    res.status(500)
    res.send(
        "Unable to delete recipe"
    )
}
})

}//end of main
//end of delete

main()

app.listen(3000, () => {

    console.log("server started")
})