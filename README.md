# S88 - Movie Catalog Application

A full-stack Movie Catalog Application built using Vue.js and an Express.js REST API. Users can browse movies, view movie details, and add comments. Administrators can manage the movie collection through an admin dashboard.

## Technologies Used

### Frontend
- Vue.js 3
- Vue Router
- Axios
- Bootstrap
- JavaScript
- HTML and CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcrypt

## Features

### User Features
- User login
- Browse available movies
- View movie details
- Add comments to movies
- View comments

### Admin Features
- Admin-only dashboard
- Add new movies
- Update existing movies
- Delete movies
- Manage the movie collection

## Demo Accounts

The following accounts are available for testing:

| Role | Email | Password |
|---|---|---|
| Admin | admin@mail.com | `admin123` |
| User | tinker.bell@mail.com | `Tinker1234` |
| User | silver.mist@mail.com | `Silver1234` |
| User | vidia.fly@mail.com | `vidia123` |


## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd s88
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## API Configuration

The frontend connects to the deployed backend API:

```text
https://s86-mte-api.onrender.com
```

The backend handles authentication, movie management, and comments.

## Project Structure

```text
s88/
├── public/
├── src/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── README.md
```

## Notes

- Some features are restricted to administrator accounts.
- Authentication uses JWT.
- Movie data is stored in MongoDB Atlas.
- The application communicates with the backend through Axios.

## Author

Developed as part of the S88 Mock Technical Exam.
