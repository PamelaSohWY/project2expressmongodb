// SETUp Express 
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const MongoUtil = require('./MongoUtil');
const Db = require('mongodb');
const mongoUrl = process.env.MONGO_URL;

let app = express();
// enable JSOn as the transfer data format (refer to Lab 10 Broiler Plate)
app.use(express.json());
// enable CORS 
app.use(cors())
// End of SETUP 

//WAS TOLD TO REMOVE ASYNC MAIN FUNCTION //Not line 20 to 175 would be wrapped in Async Function//but it does not work going back to the original

async function main() {

        await MongoUtil.connect(mongoUrl, "hawkerdb") //const declare in above setup //database name

        //The Code is for Hawker Location  
        // Create Hawker Stall - Add using POST method 
        // app.post("/locations", async (req, res) => {
        //     //contains following information which a document will need 
        //     //let name=req.body.name //used for testing in location 
        //     let stall_name = req.body.stall_name;
        //     let blk_no = req.body.blk_no;
        //     let street = req.body.street;
        //     let unit = req.body.unit;
        //     let postal_code = req.body.postal_code;
        //     let opening_hours = req.body.opening_hours;
        //     let menu_highlights = req.body.menu_highlights;
        //     let stall_owner = req.body.stall_owner;
        //     let other_details = req.body.other_details;
        //     let location_contributor = req.body.location_contributor
        //     let date_time = new Date(req.body.date_time) || new Date();
        //     let img_url = req.body.img_url;
        //     let service_rating = req.body.service_rating;
        //     let food_rating = req.body.food_rating;
        //     let cleanliness_rating = req.body.cleanliness_rating;
        //     let average_price = req.body.average_price;

        //     try {
        //         let Db = MongoUtil.getDB() // add this to activate function //take note Db is in Capital 
        //         // this section tell mongo to insert the document 
        //         let result = await Db.collection("locations").insertOne({

        //             //    name: name
        //             stall_name: stall_name,
        //             blk_no: blk_no,
        //             street: street,
        //             unit: unit,
        //             postal_code: postal_code,
        //             opening_hours: opening_hours,
        //             menu_highlights: menu_highlights,
        //             stall_owner: stall_owner,
        //             other_details: other_details,
        //             location_contributor: location_contributor,
        //             date_time: date_time,
        //             img_url: img_url,
        //             service_rating: service_rating,
        //             food_rating: food_rating,
        //             cleanliness_rating: cleanliness_rating,
        //             average_price: average_price
        //         }); // end of result
        //         res.status(200); //200 means ok 
        //         res.send(result);
        //     } catch (e) { // end of try //This is an exception handler - to catch for crash/fatal error //handle eroor from mongoDb
        //         res.status(500); //500 means fatal area
        //         res.send({
        //             error: "Internal server error. Please contact administrator"
        //         });
        //         console.log(e)
        //     } //end of catch
        // }) // end of app.post 

        // //Note : Data sent using this endpoint can be retrieved via req.body 
        // //This is done when we enable JSON process via app.use (expressJSON)
        // // working when connecting to test

        // //GET Endpoint to search for hawker locations 
        // app.get("/locations", async (req, res) => {
        //     //this lets a variable criteria to be an empty array 
        //     let criteria = {};
        //     //This contains the different criterias of search 
        //     //for each criteria write a new req.query 
        //     //reference to https://docs.mongodb.com/manual/reference/operator/query/regex/ to determine the different options possible 
        //     //Possible use for later :db.products.find( { description: { $regex: /m.*line/, $options: 'si' } } )    . Dot Character to Match New Line

        //     //Search based on Stall Name 
        //     if (req.query.stall_name) {
        //         criteria['stall_name'] = { //search based on stall_name
        //             $regex: req.query.stall_name,
        //             $options: "i"
        //         } //end of criteria 
        //     } //end of stall name query 

        //     // Search based on Street  // note if neccessary change this to general field of address later //TODO!
        //     if (req.query.street) {
        //         criteria['street'] = { //search based on stall_name
        //             $regex: req.query.street,
        //             $options: "i" //change options later TODO!
        //         } //end of criteia regex options
        //     } //end of street name query 

        //     if (req.query.food_quality) {
        //         criteria['food_quality'] = {
        //             $regex: req.query.food_quality,
        //             $options: "i" //change options later TODO!
        //         }
        //     } //end of food_quality // for this check later if the 3 quality conditons can be aggregated. 

    


        //     //How do you search by recent date criteria ? TODO! 

        //     //Show results 
        //     let Db = MongoUtil.getDB() //need this to activate 
        //     let results = await Db.collection("locations")
        //         .find(criteria)
        //         .toArray();

        //     res.status(200);
        //     res.send(results);

        // })

      app.get("locations/:id", async (req,res) => {

        let Db = MongoUtil.getDB() //need this to activate 
        let results = await Db.collection("locations").findOne({
            _id: ObjectId(req.params.id)
        }).toArray(); // end of find

        //pushing back to frondend
        res.status(200);
        res.send(results);

      })

        //PUT Endpoint to edit hawker locations 
        app.put("/locations/:id", async (req, res) => {
            // this PUT route used is with the assumption will edit all field in the locations document

            let stall_name = req.body.stall_name;
            let blk_no = req.body.blk_no;
            let street = req.body.street;
            let unit = req.body.unit;
            let postal_code = req.body.postal_code;
            let opening_hours = req.body.opening_hours;
            let menu_highlights = req.body.menu_highlights;
            let stall_owner = req.body.stall_owner;
            let other_details = req.body.other_details;
            let location_contributor = req.body.location_contributor
            let date_time = new Date(req.body.date_time) || new Date();
            let img_url = req.body.img_url;
            let service_rating = req.body.service_rating;
            let food_rating = req.body.food_rating;
            let cleanliness_rating = req.body.cleanliness_rating;
            let average_price = req.body.average_price;

            let Db = MongoUtil.getDB() //need this to activate 
            let results = await Db.collection("locations").updateOne({
                _id: ObjectId(req.params.id)
            }, {
                $set: {
                    stall_name: stall_name,
                    blk_no: blk_no,
                    street: street,
                    unit: unit,
                    postal_code: postal_code,
                    opening_hours: opening_hours,
                    menu_highlights: menu_highlights,
                    stall_owner: stall_owner,
                    other_details: other_details,
                    location_contributor: location_contributor,
                    date_time: date_time,
                    img_url: img_url,
                    service_rating: service_rating,
                    food_rating: food_rating,
                    cleanliness_rating: cleanliness_rating,
                    average_price: average_price
                }
            })
            res.send(results);
        });

        //Delete Route for Locations Collection 
        app.delete("/locations/:id", async (req, res) => {
            let Db = MongoUtil.getDB()
            let results = await Db.collection("locations").remove({
                _id: ObjectId(req.params.id)
            });
            res.status(200);
            res.send({
                message: "Ok. Deletion done"
            });
        });

        //CREATE ROUTES FOR RECIPES 

        //The Code is for Recipes  
        // Create Recipes - Add using POST method 
        app.post("/recipes", async (req, res) => {
        //     //contains following information which a document will need 
        //     //let name=req.body.name //used for testing in location 
            let recipe_name = req.body.recipe_name;
            let course = req.body.course;
            let cuisine  = req.body.cuisine;
            let history = req.body.history;
            let description = req.body.description;
            let ingredient_part_1 = req.body.ingredient_part_1;
            let ingredient_part_2  = req.body.ingredient_part_2;
            let ingredient_part_3 = req.body.ingredient_part_3;
            let preparation_method = req.body.preparation_method;
            let preparation_time = req.body.preparation_time;
            let cooking_method = req.body.cooking_method;
            let cooking_time = req.body.cookIng_time;
            let serving_size = req.body.serving_size;
            let recipe_contributor = req.body.recipe_contributor; 
            let source_of_recipe =req.body.source_of_recipe;
            let date = new Date(req.body.date_time) || new Date();
            let img_url= req.body.img_url

             try {
                 let Db = MongoUtil.getDB() // add this to activate function //take note Db is in Capital 
               // this section tell mongo to insert the document 
               let result = await Db.collection("recipes").insertOne({

        //             //    name: name
         recipe_name : recipe_name,
         course : course,
         cuisine  : cuisine,
         history : history,
         description : description,
         ingredient_part_1 : ingredient_part_1,
         ingredient_part_2  : ingredient_part_2,
         ingredient_part_3 : ingredient_part_3,
         preparation_method : preparation_method,
         preparation_time : preparation_time,
         cooking_method : cooking_method,
         cooking_time : cooking_time,
         serving_size : serving_size,
         recipe_contributor : recipe_contributor,
         source_of_recipe : source_of_recipe,
         date : date,
         img_url : img_url

        }); // end of result
                 res.status(200); //200 means ok 
                 res.send(result);
             } catch (e) { // end of try //This is an exception handler - to catch for crash/fatal error //handle eroor from mongoDb
                 res.status(500); //500 means fatal area
                 res.send({
                     error: "Internal server error. Please contact administrator"
                 });
                console.log(e)
             } //end of catch
         }) // end of app.post 




        //Read Recipes
        //GET Endpoint to search for Recipes
        app.get("/recipes", async (req, res) => {
                //this lets a variable criteria to be an empty array 
                let criteria = {};
                //This contains the different criterias of search 
                //for each criteria write a new req.query 
                //reference to https://docs.mongodb.com/manual/reference/operator/query/regex/ to determine the different options possible 
                //Possible use for later :db.products.find( { description: { $regex: /m.*line/, $options: 'si' } } )    . Dot Character to Match New Line

                //Search based on recipe Name 
                if (req.query.recipe_name) {
                    criteria['recipe_name'] = { //search based on stall_name
                        $regex: req.query.recipe_name,
                        $options: "i"
                    } //end of criteria 
                } //end of stall name query 

                // Search based on Street  // note if neccessary change this to general field of address later //TODO!
                if (req.query.description) {
                    criteria['description'] = { //search based on stall_name
                        $regex: req.query.street,
                        $options: "i" //change options later TODO!
                    } //end of criteia regex options
                } //end of street name query 

                if (req.query.ingredient_part_1) {
                    criteria['ingredient_part_1'] = {
                        $regex: req.query.food_quality,
                        $options: "i" //change options later TODO!
                    }
                }

                    if (req.query.preparation_method) {
                        criteria['preparation_method'] = {
                            $regex: req.query.food_quality,
                            $options: "i" //change options later TODO!
                        }
                    } //end of food_quality // for this check later if the 3 quality conditons can be aggregated. 

                    //Show results 
                    let Db = MongoUtil.getDB() //need this to activate 
                    let results = await Db.collection("recipes")
                        .find(criteria)
                        .toArray();

                    res.status(200);
                    res.send(results);
                })

            //Update Route for Recipes Collection
              //PUT Endpoint to recipes 
        app.put("/recipes/:id", async (req, res) => {
            // this PUT route used is with the assumption will edit all field in the locations document

            let recipe_name = req.body.recipe_name;
            let course = req.body.course;
            let cuisine  = req.body.cuisine;
            let history = req.body.history;
            let description = req.body.description;
            let ingredient_part_1 = req.body.ingredient_part_1;
            let ingredient_part_2  = req.body.ingredient_part_2;
            let ingredient_part_3 = req.body.ingredient_part_3;
            let preparation_method = req.body.preparation_method;
            let preparation_time = req.body.preparation_time;
            let cooking_method = req.body.cooking_method;
            let cooking_time = req.body.cookIng_time;
            let serving_size = req.body.serving_size;
            let recipe_contributor = req.body.recipe_contributor; 
            let source_of_recipe =req.body.source_of_recipe;
            let date = new Date(req.body.date_time) || new Date();
            let img_url= req.body.img_url

            let Db = MongoUtil.getDB() //need this to activate 
            let results = await Db.collection("recipes").updateOne({
                _id: ObjectId(req.params.id)
            }, {
                $set: {
                    recipe_name : recipe_name,
                    course : course,
                    cuisine  : cuisine,
                    history : history,
                    description : description,
                    ingredient_part_1 : ingredient_part_1,
                    ingredient_part_2  : ingredient_part_2,
                    ingredient_part_3 : ingredient_part_3,
                    preparation_method : preparation_method,
                    preparation_time : preparation_time,
                    cooking_method : cooking_method,
                    cooking_time : cookIng_time,
                    serving_size : serving_size,
                    recipe_contributor : recipe_contributor,
                    source_of_recipe : source_of_recipe,
                    date : date_time,
                    img_url : img_url
                }
            })
            res.send(results);
        });



            //Delete Route for Recipes Collection 
            app.delete("/recipes/:id", async (req, res) => {
                let Db = MongoUtil.getDB()
                let results = await Db.collection("recipes").remove({
                    _id: ObjectId(req.params.id)
                });
                res.status(200);
                res.send({
                    message: "Ok. Deletion of Recipe done"
                });
            });

//GET Endpoint to search for reviews based on recipe id
app.get("/recipe/reviews/:id", async (req, res) => {
    // res.send("hello")
    //this lets a variable criteria to be an empty array 
    let criteria = {};
    //This contains the different criterias of search 
    //for each criteria write a new req.query 
    //reference to https://docs.mongodb.com/manual/reference/operator/query/regex/ to determine the different options possible 
    //Possible use for later :db.products.find( { description: { $regex: /m.*line/, $options: 'si' } } )    . Dot Character to Match New Line

    //Search based on recipe_id
    if (req.params.id) {
        criteria['recipe_id'] = { //search based on recipe_id
            $regex: req.params.id,
            $options: "i"
        } //end of criteria 
    } //end of stall name query 
    
    //How do you search by recent date criteria ? TODO! 

    //Show results 
    let Db = MongoUtil.getDB() //need this to activate 
    let results = await Db.collection("reviews")
        .find(criteria)
        .toArray();

    res.status(200);
    res.send(results);
});

    //GET Endpoint to search for reviews based on locations id
app.get("/location/reviews/:id", async (req, res) => {
    //this lets a variable criteria to be an empty array 
    let criteria = {};
    //This contains the different criterias of search 
    //for each criteria write a new req.query 
    //reference to https://docs.mongodb.com/manual/reference/operator/query/regex/ to determine the different options possible 
    //Possible use for later :db.products.find( { description: { $regex: /m.*line/, $options: 'si' } } )    . Dot Character to Match New Line

    // Search based on Street  // note if neccessary change this to general field of address later //TODO!
    if (req.params.id) {
        criteria['location_id'] = { //search based on location_id
            $regex: req.params.id,
            $options: "i" //change options later TODO!
        } //end of criteia regex options
    } //end of street name query 
      //Show results 
      let Db = MongoUtil.getDB() //need this to activate 
      let results = await Db.collection("reviews")
          .find(criteria)
          .toArray();
  
      res.status(200);
      res.send(results);
  
});








        } //end of main

        main()

        //Start Server 
        app.listen(process.env.PORT, () => {
            console.log("server started")
        })

        //Reference source of code NodeJS and Express Lab Code - Lab 10 
        //Reference source of code : https://expressjs.com/en/guide/routing.html