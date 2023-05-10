const express = require("express");

const bookRouter = require("./routes/books");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("OK");
});
app.use("/books", bookRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

app.listen(port, () => {
  console.log(`Server is listening on port - ${port}...`);
});
