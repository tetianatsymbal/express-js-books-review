const express = require("express");
const { books } = require("../data/books");
const {
  validateBookExists,
  validateReviewExists,
  validateBookTitleExists,
} = require("../middlewares/books.middleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:bookId", validateBookExists, (req, res, next) => {
  const { bookId } = req.params;
  const book = books.find((book) => book.id === Number(bookId));
  res.json(book);
});

router.post("/", validateBookTitleExists, (req, res, next) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    reviews: [],
  };
  books.push(book);
  res.status(201).json(book);
});

router.put(
  "/:bookId",
  validateBookExists,
  validateBookTitleExists,
  (req, res, next) => {
    req.book.title = req.body.title;
    res.json(req.book);
  }
);

router.post("/:bookId/reviews", validateBookExists, (req, res, next) => {
  const review = {
    id: req.book.reviews.length + 1,
    comment: req.body.comment,
  };
  req.book.reviews.push(review);
  res.status(201).json(req.book);
});

router.delete(
  "/:bookId/reviews/:reviewId",
  validateBookExists,
  validateReviewExists,
  (req, res, next) => {
    const { bookId, reviewId } = req.params;
    const bookIndex = books.findIndex((book) => book.id === Number(bookId));
    const reviewIndex = books[bookIndex].reviews.findIndex(
      (review) => review.id === Number(reviewId)
    );
    books[bookIndex].reviews.splice(reviewIndex, 1);

    res.json(books[bookIndex]);
  }
);

router.get("/:bookId/reviews", validateBookExists, (req, res, next) => {
  res.json(req.book.reviews);
});

module.exports = router;
