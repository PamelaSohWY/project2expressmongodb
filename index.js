// SETUp Express 
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const MongoUtil = require('./MongoUtil');
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

        try {
            let Db = MongoUtil.getDB()  // add this to activate function //take note Db is in Capital 
            // this section tell mongo to insert the document 
            let result = await Db.collection("locations").insertOne({

                //    name: name
                 stall_name : stall_name,
                 blk_no : blk_no,
                 street : street,
                 unit : unit,
                 postal_code : postal_code,
                 opening_hours : opening_hours,
                 menu_highlights : menu_highlights,
                 stall_owner : stall_owner,
                 other_details : other_details,
                 location_contributor : location_contributor,
                 date_time : date_time
            }); // end of result
            res.status(200); //200 means ok 
            res.send(result);
        } catch (e) {// end of try //This is an exception handler - to catch for crash/fatal error //handle eroor from mongoDb
        res.status(500); //500 means fatal area
        res.send ({
            error: "Internal server error. Please contact administrator"
        });
        console.log(e)
        }//end of catch
    }) // end of app.post 
} //end of main
//Note : Data sent using this endpoint can be retrieved via req.body 
//This is done when we enable JSON process via app.use (expressJSON)
// working when connecting to test

main()

//Start Server 
app.listen(3000, () => {
    console.log("server started")
})

//Reference source of code NodeJS and Express Lab Code - Lab 10 