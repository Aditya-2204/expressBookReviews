const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const BASE_URL = 'http://localhost:5000';

public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
  
    // Check if username or password is missing
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
  
    // Check if user already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return res.status(409).json({ message: "Username already exists." });
    }
  
    // Register new user
    users.push({ username, password });
    return res.status(200).json({ message: "User registered successfully!" });
  });

// Task 10: Get all books (Async/Await)
public_users.get('/', async (req, res) => {
    try {
      const response = await axios.get(`${BASE_URL}/`);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch books." });
    }
  });
  
  // Task 11: Get book by ISBN (Async/Await)
  public_users.get('/isbn/:isbn', async (req, res) => {
    try {
      const { isbn } = req.params;
      const response = await axios.get(`${BASE_URL}/`);
      const book = response.data[isbn];
      if (book) {
        return res.status(200).json(book);
      } else {
        return res.status(404).json({ message: "Book not found." });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving book by ISBN." });
    }
  });
  
  // Task 12: Get books by Author (Async/Await)
  public_users.get('/author/:author', async (req, res) => {
    try {
      const { author } = req.params;
      const response = await axios.get(`${BASE_URL}/`);
      const books = response.data;
      const filtered = Object.values(books).filter(book =>
        book.author.toLowerCase() === author.toLowerCase()
      );
      return res.status(200).json(filtered);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving books by author." });
    }
  });
  
  // Task 13: Get books by Title (Async/Await)
  public_users.get('/title/:title', async (req, res) => {
    try {
      const { title } = req.params;
      const response = await axios.get(`${BASE_URL}/`);
      const books = response.data;
      const filtered = Object.values(books).filter(book =>
        book.title.toLowerCase() === title.toLowerCase()
      );
      return res.status(200).json(filtered);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving books by title." });
    }
  });
  
  module.exports.general = public_users;