const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// TASK 6
public_users.post("/register", (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    if (userName && password){
        if (isValid(userName)){
            return res.status(404).json({message: "User already Exist"});
        }else{
            users.push({"userName":userName, "password":password});
            return res.status(200).json({message: "User successfully registered."});
        }
    }else{
        res.status(404).json({message: "Unable to register the user."});
    }
});

// TASK 1
// Get the book list available in the shop
// public_users.get('/', function (req, res) {
//     res.send(JSON.stringify({ books }, null, 4))
// });

// TASK 10
// public_users.get('/', async function (req, res) {
//     await new Promise((resolve, reject) => {
//         resolve(res.send(JSON.stringify({ books }, null, 4)))
//     })
//     console.log("Task 10 completed")
// });

// TASK 10
public_users.get('/', function (req, res) {
    const books_ex = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({ books }, null, 4)));
    })
    books_ex.then(console.log("Task 10 completed"))
    .catch(res.status(404).json({message: "Cannot display books"}))
});

// TASK 2
// Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
//     const isbn = req.params.isbn;
//     res.send(books[isbn])
// });

// TASK 11
// public_users.get('/isbn/:isbn', async function (req, res) {
//     const isbn = req.params.isbn;
//     await new Promise((resolve, reject) => {
//         res.send(books[isbn])
//     })
//     console.log("Task 11 completed")
// });

// TASK 11
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let isbn_ex = new Promise((resolve, reject) => {
        if (books[isbn])
            resolve( res.send(books[isbn]) )
        reject()
    })
    isbn_ex.then(console.log("Task 11 completed"))
    .catch(res.status(404).json({message: "Book not found"}))
});

// TASK 3
// Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//     const author = req.params.author;
//     filtered_books = [];
//     for (let i = 1; i <= 10; i++) {
//         if (books[i].author === author) {
//             filtered_books.push(books[i]);
//         }
//     }
//     res.send(filtered_books);
// });

// TASK 12
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let author_ex = new Promise((resolve, reject)=>{
        filtered_books = [];
        for (let i = 1; i <= 10; i++) {
            if (books[i].author === author) {
                filtered_books.push(books[i]);
            }
        }
        resolve (res.send(filtered_books))
    })
    author_ex.then(console.log("Task 12 completed"))
});

// TASK 4
// Get all books based on title
// public_users.get('/title/:title', function (req, res) {
//     const title = req.params.title;
//     filtered_books = [];
//     for (let i = 1; i <= 10; i++) {
//         if (books[i].title === title) {
//             filtered_books.push(books[i]);
//         }
//     }
//     res.send(filtered_books);
// });

// TASK 13
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const title_ex = new Promise((resolve, reject) => {
        filtered_books = [];
        for (let i = 1; i <= 10; i++) {
            if (books[i].title === title) {
                filtered_books.push(books[i]);
            }
        }
        resolve(res.send(filtered_books));
    })
    .then(console.log("Task 13 completed"))
});

// TASK 5
//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].review)
});

module.exports.general = public_users;
