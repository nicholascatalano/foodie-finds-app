const filterFormHandler = async (event) => {
  event.preventDefault();

  const cityInput = document.querySelector('#city-input').value;

  const typeOptions = Array.from(
    document.querySelectorAll('input[name="typeOptions"]:checked')
  )
    .map((checkbox) => checkbox.value)
    .join(',');

  const cuisineOptions = Array.from(
    document.querySelectorAll('input[name="cuisineOptions"]:checked')
  )
    .map((checkbox) => checkbox.value)
    .join(',');

  const priceOptions = Array.from(
    document.querySelectorAll('input[name="priceOptions"]:checked')
  )
    .map((checkbox) => checkbox.value)
    .join(',');

  const ratingOptions = Array.from(
    document.querySelectorAll('input[name="ratingOptions"]:checked')
  )
    .map((checkbox) => checkbox.value)
    .join(',');

  let apiEndpoint = `/filter/?city=${cityInput}`;

  if (typeOptions) {
    apiEndpoint += `&type=${typeOptions}`;
  }

  if (cuisineOptions) {
    apiEndpoint += `&cuisine=${cuisineOptions}`;
  }

  if (priceOptions) {
    apiEndpoint += `&price=${priceOptions}`;
  }

  if (ratingOptions) {
    apiEndpoint += `&rating=${ratingOptions}`;
  }

  const response = await fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(apiEndpoint);
  if (response.ok) {
    document.location.replace('/filter'); // reloads page to filter page if successful
  } else {
    alert('Failed to filter results!');
  }
};

document
  .querySelector('#filterSubmit')
  .addEventListener('submit', filterFormHandler);
