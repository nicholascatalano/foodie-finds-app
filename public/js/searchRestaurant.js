// the user inputs the name of the restaurant
// option to add the city as well
async function fetchRestaurantData() {
  const queryForm = document.querySelector('#review-restaurant').value.trim(); //from the new review form
  const cityForm = document.querySelector('#review-city').value.trim(); //from review form

  const apiKey = process.env.DB_API_KEY;
  const searchQuery = queryForm.split(' ').join('%20') + '%20' + cityForm;

  //this will look for the restaurant location using Tripadvisor content API
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  const response = await fetch(
    `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${searchQuery}&category=restaurants&language=en&key=${apiKey}`,
    options
  );

  //response object will have data array - assume the correct hit will be the first
  const restaurantData = response.data[0];
  const locationId = restaurantData.location_id; //this will be used to get the restaurant details with a second API search

  //get restaurant details using the locationId and save them in an object
  const restaurantDetails = await fetch(
    `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?language=en&currency=USD&key=${apiKey}`,
    options
  );

  //   restaurantDetails will have name, address_obj.city, cuisine, website, price_level, subcategories
  //   needs a fetch request for api/restaurants/ -> can make a post request to create a restaurant so we can render it
}
