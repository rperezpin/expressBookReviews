# Book Review API 📚  

This application is a REST API built with Node.js and Express that allows users to manage books and their reviews.  

## 🚀 Features  

- **User registration**: Anyone can register in the system.  
- **JWT Authentication**: Registered users can log in and receive an authentication token.  
- **Book search**: Books can be searched by ISBN, author, or title.  
- **Review management**: Authenticated users can add, modify, or delete their book reviews.  

## 🔧 Technologies Used  

- Node.js  
- Express.js  
- JWT (JSON Web Tokens)  
- Express-session  

## 📌 Main Endpoints  

### Public Routes  
- `POST /register` → User registration  
- `GET /` → List of books  
- `GET /isbn/:isbn` → Search for a book by ISBN  
- `GET /author/:author` → Search for books by author  
- `GET /title/:title` → Search for books by title  
- `GET /review/:isbn` → Get book reviews  

### Protected Routes (require authentication)  
- `POST /customer/login` → User login  
- `PUT /customer/auth/review/:isbn?review=text` → Add or modify a review  
- `DELETE /customer/auth/review/:isbn` → Delete a review  

## 🏁 Installation and Execution  

1. Clone the repository:  
   ```bash
   git clone https://github.com/rperezpin/expressBookReviews.git
   cd expressBookReviews/final_project
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the server:  
   ```bash
   node index.js
   ```
4. The API will be available at `http://localhost:5000`  

This project is part of a learning path in a programming course.  

Ready! Now you can test the API using tools like Postman or cURL. 🚀
