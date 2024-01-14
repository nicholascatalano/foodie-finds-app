//first check if the restaurant is in the db using the name and city
const isRestaurantInDb = async (restaurantName, city) => {
  //will look for the restaunt using this fetch request
  const response = await fetch(`/api/restaurants/${restaurantName}/${city}`);

  //if response.ok
  if (response.ok) {
    //it already exists. assign the restaurant id ?? confused on what to do here
  } else {
    //lookit up using the external api
    fetchRestaurantData(restaurantName, city);
  }
};

//fetchRestaurantData will return true if a new restaurant was successfully created 
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
  const locationId = response.data[0].location_id; //this will be used to get the restaurant details with a second API search

  //get restaurant details using the locationId and save them in an object
  const restaurantDetails = await fetch(
    `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?language=en&currency=USD&key=${apiKey}`,
    options
  );

  //   deconstruct restaurantDetails with the info we need to send to the model
  const {
    location_id,
    name,
    address_obj: { city },
    price_level,
    cuisine,
    subcategory,
  } = restaurantDetails;

  //   POST request for api/restaurants/ -> can make a post request to create a restaurant so we can render it
  const newRest = await fetch('/api/restaurants/', {
    mehod: 'POST',
    body: JSON.stringify({ location_id, name, city, price_level }),
    headers: { 'Content-Type': 'application/json' },
  });

  return newRest;
}
