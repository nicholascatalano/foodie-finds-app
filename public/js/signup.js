const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/'); // if user is able to signup, goes to homepage
  } else {
    alert('Failed to sign up!');
  }
};

document.querySelector('#signup').addEventListener('submit', signupFormHandler);
