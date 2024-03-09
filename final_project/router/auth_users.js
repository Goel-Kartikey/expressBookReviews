const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  let username_ex = users.filter((user)=> {return user.userName === username})
  if (username_ex.length > 0){
      return true;
  }else{
      return false;
  }
}

const authenticatedUser = (username, password) => {
    let validusers = users.filter((user) => {
        return (user.userName === username && user.password === password)
    });
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}
regd_users.get("/userg", (req, res) => {
    res.send(JSON.stringify({ users }, null, 4));
});

// TASK 7
//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!password || !username) {
        res.status(404).json({ message: "Unable to login" });
    }
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("Customer successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// TASK 8
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const comment = req.query.review;
    const username = req.session.authorization['username'];
    let userReview = users.filter((user) => user.userName === username);
    const userReviewed = userReview[0];
    if (!userReviewed.review) { review = (userReviewed.review) = [] };
    review.push({ [isbn]: comment });
    res.send(`The review for the book with ISBN ${isbn} has been added/updated`)
});

// TASK 9
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization['username'];
    let rec = users.filter((user) => user.userName === username)
    let record = rec[0].review;
    console.log(record);
    let newReview = [];
    for (let i = 0; i < Object.keys(record).length; i++) {
        if (Object.keys(record[0])[i] === [isbn]) { 
            continue;
        }else{
            newReview.push({[Object.keys(record[0])[i]]:record[0][Object.keys(record[0])[i]]})
        }
    }
    rec[0].review = newReview;
    console.log(newReview)
    res.send(`Review for the ISBN ${isbn} posted by the user deleted`)
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;