const newPostHandler = async function (event) {
	event.preventDefault();

	if (title && body) {
		await fetch('/api/post', {
			method: 'POST',
			body: JSON.stringify({
				title,
				body,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		document.location.replace('/dashboard');
	}
};

document
	.querySelector('#new-post-form')
	.addEventListener('submit', newPostHandler);