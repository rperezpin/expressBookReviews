const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Simulating async behavior with local `books` object
const getBooks = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books);
        }, 100);
    });
};

const getBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (books[isbn]) {
                resolve(books[isbn]);
            } else {
                reject("Book not found.");
            }
        }, 100);
    });
};

const getBooksByAuthor = (author) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const booksByAuthor = Object.values(books).filter(book => book.author === author);
            if (booksByAuthor.length > 0) {
                resolve(booksByAuthor);
            } else {
                reject("No books found by this author.");
            }
        }, 100);
    });
};

const getBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const booksByTitle = Object.values(books).filter(book => book.title === title);
            if (booksByTitle.length > 0) {
                resolve(booksByTitle);
            } else {
                reject("No books found by this title.");
            }
        }, 100);
    });
};

const getBookReviews = (isbn) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (books[isbn]) {
                resolve(books[isbn].reviews);
            } else {
                reject("Book not found.");
            }
        }, 100);
    });
};

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ 'username': username, 'password': password });
            return res.status(200).json({ message: 'User successfully registered. Now you can login' });
        } else {
            return res.status(404).json({ message: 'User already exists!' });
        }
    }
    return res.status(404).json({ message: 'Unable to register user.' });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    try {
        const allBooks = await getBooks();
        res.send(JSON.stringify(allBooks, null, 4));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book list.' });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const book = await getBookByISBN(isbn);
        res.send(book);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const booksByAuthor = await getBooksByAuthor(author);
        res.status(200).json(booksByAuthor);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const booksByTitle = await getBooksByTitle(title);
        res.status(200).json(booksByTitle);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

// Get book review
public_users.get('/review/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const reviews = await getBookReviews(isbn);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

module.exports.general = public_users;
