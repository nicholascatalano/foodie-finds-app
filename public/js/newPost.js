const newPostHandler = async function (event) {
  event.preventDefault();

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
    document.location.replace('/dashboard');
  }
};

document
  .querySelector('#new-review-form')
  .addEventListener('submit', newPostHandler);
