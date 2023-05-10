const { books } = require("../data/books");

const validateBookExists = (req, res, next) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).send("Book not found");
  }
  req.book = book;
  next();
};

const validateReviewExists = (req, res, next) => {
  const reviewId = parseInt(req.params.reviewId);
  const review = req.book.reviews.find((r) => r.id === reviewId);
  if (!review) {
    return res.status(404).send("Review not found");
  }
  req.review = review;
  next();
};

const validateBookTitleExists = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send("Title is required");
  }
  next();
};

module.exports = {
  validateBookExists,
  validateReviewExists,
  validateBookTitleExists,
};
