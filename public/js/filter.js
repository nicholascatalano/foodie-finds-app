// Filter form handler to grab user input and fetch api data based on the queries
const filterFormHandler = async (event) => {
  event.preventDefault();

  // user input
  const cityInput = document.querySelector('#city-input').value;

  // checks to see if user checked any of the boxes in the group, and remaps them into one string separated by commas
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

  // redefine api endpoint
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

  // fetch request to api using api endpoint
  const response = await fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(apiEndpoint);
  // move user to /filter page to display filtered results
  if (response.ok) {
    console.log(response);
    //   document.location.replace('/filter');
  } else {
    alert('Failed to filter results!');
  }
};

document
  .querySelector('#filterSubmit')
  .addEventListener('submit', filterFormHandler);
