//first check if the restaurant is in the db
//using the name and city
const isRestaurantInDb = (restaurantName, city) => {

}


//fetchRestaurantData uses an api KEY 
async function fetchRestaurantData(restaurantName, city) {
  const apiKey = process.env.DB_API_KEY;
  //remove spaces and replace them with %20 to match the format for the search query
  const searchQuery =
    restaurantName.split(' ').join('%20') + '%20' + city.split(' ').join('%20');

  //this will look for the restaurant location using Tripadvisor content API
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  const response = await fetch(
    `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${searchQuery}&category=restaurants&language=en&key=${apiKey}`,
    options
  );

  //response object will have data array - assume the correct hit will be the first
  const restaurantData = response.data[0];
  const locationId = restaurantData.location_id; //this will be used to get the restaurant details with a second API search

  //search the db to see if this restaurant already exists
  //if statement to check if the restaurant is already in the db
  //if it does, use that data
  //if not then do a second fetch request

  //get restaurant details using the locationId and save them in an object
  const restaurantDetails = await fetch(
    `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?language=en&currency=USD&key=${apiKey}`,
    options
  );

  //   restaurantDetails will have name, address_obj.city, cuisine, website, price_level, subcategories
  //   needs a fetch request for api/restaurants/ -> can make a post request to create a restaurant so we can render it
}
