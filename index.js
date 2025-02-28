const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4:uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

let posts = [
    {
        id:uuidv4(),
        username:"omkar",
        content:"I love to play football",

    },
    {   id:uuidv4(),
        username:"rushi Kumar",
        content:"I got selected in my campus placement",
    },
    {
        id:uuidv4(),
        username:"ronak",
        content:"I crack my job called mern stack developer",
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs" ,{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let { username , content} = req.body;
    let id = uuidv4();
    posts.push({ id , username , content});
    res.redirect("/posts");
})

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs",{post});
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
     posts = posts.filter((p)=> id !== p.id);
     res.redirect("/posts");
})
  

app.listen(port, () => {
    console.log("app is listing at :", port);
});
