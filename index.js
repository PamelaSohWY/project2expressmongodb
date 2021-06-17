// SETUp Express 
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const MongoUtil = require('./MongoUtil');
const { Db } = require('mongodb');
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
    app.post("/locations", async (req, res) => {
        //contains following information which a document will need 
        //let name=req.body.name //used for testing in location 
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
        let cleanliness_rating=req.body.cleanliness_rating;
        let average_price = req.body.average_price
        try {
            let Db = MongoUtil.getDB() // add this to activate function //take note Db is in Capital 
            // this section tell mongo to insert the document 
            let result = await Db.collection("locations").insertOne({

                //    name: name
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
                service_rating : service_rating,
                cleanliness_rating: cleanliness_rating,
                avergae_price:average_price
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
} //end of main
//Note : Data sent using this endpoint can be retrieved via req.body 
//This is done when we enable JSON process via app.use (expressJSON)
// working when connecting to test

//GET Endpoint to search for hawker locations 
app.get("/locations", async (req, res) => {
    //this lets a variable criteria to be an empty array 
    let criteria = {};
    //This contains the different criterias of search 
    //for each criteria write a new req.query 
    //reference to https://docs.mongodb.com/manual/reference/operator/query/regex/ to determine the different options possible 
    //Possible use for later :db.products.find( { description: { $regex: /m.*line/, $options: 'si' } } )    . Dot Character to Match New Line
    
    //Search based on Stall Name 
    if (req.query.stall_name) {
        criteria['stall_name'] = { //search based on stall_name
                $regex: req.query.stall_name, 
                $options:"i"
        } //end of criteria 
    } //end of stall name query 

    // Search based on Street  // note if neccessary change this to general field of address later //TODO!
    if (req.query.street) {
        criteria['street'] = { //search based on stall_name
                $regex: req.query.street, 
                $options:"i"  //change options later TODO!
            }//end of criteia regex options
    } //end of street name query 

    if (req.query.food_quality) { 
        criteria['food_quality'] ={
            $regex: req.query.food_quality,
            $options:"i" //change options later TODO!
        }
    } //end of food_quality // for this check later if the 3 quality conditons can be aggregated. 


    //How do you search by recent date criteria ? TODO! 

    //Show results 
    let Db = MongoUtil.getDB() //need this to activate 
    let results = await Db.collection("locations")
    .find(criteria)
    .toArray();

    res.status(200);
    res.send(results);

})

main()

//Start Server 
app.listen(3000, () => {
    console.log("server started")
})

//Reference source of code NodeJS and Express Lab Code - Lab 10 
//Reference source of code : https://expressjs.com/en/guide/routing.html