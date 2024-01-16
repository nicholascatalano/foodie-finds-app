const newPostHandler = async function (event) {
  event.preventDefault();
  const city = document.querySelector('#review-city').value;
  const restaurant = document.querySelector('#review-restaurant').value;
  const rating = document.querySelector('#review-rating').value;
  const content = document.querySelector('#review-content').value;

  const restaurant_id = await fetchRestaurant_id(restaurant, city);
  console.log('restaurant_id', restaurant_id);

  if (city && restaurant && rating && content && restaurant_id) {
    await fetch('/api/review', {
      method: 'POST',
      body: JSON.stringify({
        city,
        restaurant,
        rating,
        content,
        restaurant_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Review created!!');
    document.location.replace('/');
  }
};

document
  .querySelector('#new-review-form')
  .addEventListener('submit', newPostHandler);
