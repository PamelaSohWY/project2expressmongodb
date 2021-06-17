document.querySelector('#add').addEventListener('click', async ()=>{   //based on the class id add, on the event click, execute the following function 
    let stall_name = document.querySelector('#stall_name').value; 
    let blk_no = document.querySelector('#blk_no').value; 
    let street = document.querySelector('#street').value; 
    let unit = document.querySelector('#unit').value; 
    let postal_code = document.querySelector('#postal_code').value; 
    let opening_hours = document.querySelector('#opening_hours').value; 
    
    //menu highlights will need code to put every item separated by a comma (written as string) into an array
    let menu_highlights = document.querySelector('#menu_highlights').value.split(","); //split(using comma as marker)
    menu_hightlights = menu_highlights.map( function(m){ //map is used to transform each element into a string
             return m.trim();//trim very useful to remove spaces and newlines from both ends of a string

    }) //end of menu highlights

    let stall_owner = document.querySelector('#stall_owner').value; 
    let other_details = document.querySelector('#other_details').value; 
    let location_contributor = document.querySelector('#location_contributor').value;
    let date_time = document.querySelector('#date_time').value;
    let service_rating = document.querySelector('#service_rating').value;
    let food_rating = document.querySelector('#food_rating').value;
    let cleanliness_rating = document.querySelector('#cleanliness_rating').value;
    let average_price = document.querySelector('#average_price').value;
  
  // use your gitpod URL here
 
    await axios.post(' https://3000-amethyst-canid-ubusltct.ws-us09.gitpod.io/locations', {
        stall_name, blk_no, street, unit, postal_code, opening_hours, menu_highlights, stall_owner, other_details, location_contributor, date_time, service_rating, food_rating, cleanliness_rating, average_price
    })
    alert("New Hawker Location Added !")
  })
//  This is for the testing of the routes 