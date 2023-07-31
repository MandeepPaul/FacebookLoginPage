
const loginButton = document.getElementById('loginButton');

    // Add an event listener to the button
    loginButton.addEventListener('click', function() {
        // Check if there is an error query parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');

        // If the error exists, update the inner HTML of the element with id="error-message"
        if (error) {
            const errorMessageElement = document.getElementById('error-message');
            errorMessageElement.textContent = error;
        }
        const loginButton = document.getElementById('loginButton');
    });