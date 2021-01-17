const express = require("express");
const body_parser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const home_content = "home starting content";
const about_content = "about content";
const contact_content = "contact content";

var posts = [];

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));


// Get
app.get("/", (req, res) => {
    res.render("home", {content: home_content, posts: posts});
});
app.get("/about", (req, res) => {
    res.render("about", {content: about_content});
});
app.get("/contact", (req, res) => {
    res.render("contact", {content: contact_content});
});
app.get("/compose", (req, res) => {
    res.render("compose");
});
app.get("/posts/:post_title", (req, res) => {
    const post = posts.find((post) => _.lowerCase(post.title) === _.lowerCase(req.params.post_title));
    res.render("post", {title: post.title, text: post.text});
});

// Post
app.post("/compose", (req, res) => {
    const post = {
        title: req.body.post_title,
        text: req.body.post_text
    };
    posts.push(post); 
    res.redirect("/");
});

// Listen
app.listen(3000, () => {
    console.log("Server running in port 3000!");
});