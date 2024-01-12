const newPostHandler = async function (event) {
  event.preventDefault();
  const city = document.querySelector('#review-city').value;
  const restaurant = document.querySelector('#review-restaurant').value;
  const rating = document.querySelector('#review-rating').value;
  const content = document.querySelector('#review-content').value;

  if (city && restaurant && rating && rating && content) {
    await fetch('/api/review', {
      method: 'POST',
      body: JSON.stringify({
        city,
        restaurant,
        rating,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    document.location.replace('/');
  }
};

document
  .querySelector('#new-review-form')
  .addEventListener('submit', newPostHandler);
