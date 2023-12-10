# User Authentication with Node.js, Express.js, and MongoDB

This project demonstrates a user authentication system built using Node.js, Express.js, MongoDB, and session management for user login, registration, and access control. User credentials are securely stored in the MongoDB database with MD5 encryption.

## Features

- **Login Page**: Allows existing users to log in.
- **Invalid Credentials Handling**: Displays an error message for invalid login attempts.
- **Registration Page**: Enables new users to create an account with credentials securely stored in MongoDB using MD5 encryption.
- **Unauthorized Access Handling**: Shows an error when users attempt to access restricted pages without logging in.

## Screenshots
| Login Page | Invalid Credentials |
| ------------------ | ------------------- |
| ![Login Page](https://github.com/MandeepPaul/FacebookLoginPage/assets/113959405/6cd846ff-68e4-4d63-9853-77a773e2f75d) | ![Invalid Credentials](https://github.com/MandeepPaul/FacebookLoginPage/assets/113959405/0845557e-311e-4193-9fe9-c5a39a234ace) |

| Registration Page | Unauthorized Access Error |
| ------------------ | ------------------- |
| ![Registration Page](https://github.com/MandeepPaul/FacebookLoginPage/assets/113959405/4f0d72a6-4924-4188-8575-e9eed7ccaa12) | ![Unauthorized Access Error](https://github.com/MandeepPaul/FacebookLoginPage/assets/113959405/57e86f87-9546-4d96-84e7-5e659ad548ee) |

| Home Page | MongoDB Database |
| ------------------ | ------------------- |
| ![Screenshot 2023-12-10 120126](https://github.com/MandeepPaul/FacebookLoginPage/assets/113959405/89644ae9-7764-41c4-a8ec-6657c513ae80) | ![Screenshot 2023-12-10 122351](https://github.com/MandeepPaul/FacebookLoginPage/assets/113959405/349d95f6-0251-499b-9541-8e4248f839d0) |

## Setup Instructions

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your MongoDB connection by configuring the database in `config.js`.
4. Run the application using `npm start`.
5. Access the application in your browser at `http://localhost:3100`.

## Usage

- Visit the login page (`http://localhost:3100/login`) to log in with existing credentials.
- To create a new user account, navigate to the registration page (`http://localhost:3100/register`).
- Access restricted pages and observe the handling of unauthorized access.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Sessions

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.
