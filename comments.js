// Create web server

// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Create web server
const app = express();

// Set up body-parser
app.use(bodyParser.json());

// Set up comments
let comments = [];

// Set up routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/comments", (req, res) => {
    res.send(comments);
});

app.post("/comments", (req, res) => {
    comments.push(req.body);
    res.send("Comment added");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
```

## 2. Create a simple web page to interact with the web server

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <form id="comment-form">
        <input type="text" id="comment" placeholder="Enter your comment">
        <button type="submit">Submit</button>
    </form>
    <ul id="comments"></ul>
    <script>
        const form = document.getElementById("comment-form");
        const commentInput = document.getElementById("comment");
        const commentsList = document.getElementById("comments");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const comment = commentInput.value;
            commentInput.value = "";

            fetch("http://localhost:3000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comment })
            })
            .then((res) => res.text())
            .then((text) => {
                console.log(text);
                fetch("http://localhost:3000/comments")
                .then((res) => res.json())
                .then((comments) => {
                    commentsList.innerHTML = comments
                        .map((comment) => `<li>${comment.comment}</li>`)
                        .join("");
                });
            });
        });

        fetch("http://localhost:3000/comments")
        .then((res) => res.json())
        .then((comments) =>