//fetchRestaurant_id will first look for the restaurant in the database
//it will return the restaurant_id

const fetchRestaurant_id = async (restaurantName, cityName) => {
  //will look for the restaunt in the db using this fetch request
  const response = await fetch(
    `/api/restaurants/${restaurantName}/${cityName}`
  );

  //if response.ok it will return the existing restaurant_id
  if (response.ok) {
    //it already exists. Grab the restaurant_id from the response
    const restaurantInfo = await response.json();
    let restaurant_id = restaurantInfo.id;
    return restaurant_id;
  } else {
    //if not, it will create a new restaurant using the fetchRestaurantExternally function
    let restaurant_id = await fetchRestaurantExternally(
      restaurantName,
      cityName
    );
    return restaurant_id;
  }
};

//fetchRestaurantData will return true if a new restaurant was successfully created
async function fetchRestaurantExternally(restaurantName, cityName) {
  //remove spaces and replace them with %20 to match the format for the search query
  const searchQuery =
    restaurantName.split(' ').join('%20') +
    '%20' +
    cityName.split(' ').join('%20');

  //this will look for the restaurant location using Tripadvisor content API using the backend API endpoint /api/restaurants/:searchQuery
  const response = await fetch(`/api/restaurants/${searchQuery}`);
  const placesData = await response.json();

  //response object will have data array - assume the correct hit will be the first
  const locationId = placesData.data[0].location_id; //this will be used to get the restaurant details with a second API search

  //get restaurant details using the locationId and save them in an object
  const restaurantData = await fetch(`/api/restaurants/${locationId}`);
  const restaurantDetails = await restaurantData.json();

  //   deconstruct restaurantDetails with the info we need to send to the model
  const {
    location_id,
    name,
    address_obj: { city },
    price_level,
    cuisine,
    subcategory,
  } = restaurantDetails;

  console.log(`restaurant ${name} is going to be added to the db next!`);

  // // POST request for api/restaurants/ -> can make a post request to create a restaurant so we can render it
  // const newRest = await fetch('/api/restaurants/', {
  //   method: 'POST',
  //   body: JSON.stringify({ location_id, name, city, price_level }),
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // // Handle the response from the fetch request
  // const newRestaurantInfo = await newRest.json();

  // return newRestaurantInfo.id;
}
