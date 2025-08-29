const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const mongoose = require("mongoose");
main()
    .then(() => { console.log("connection successfull") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');
}

const Chat = require("./models/chat.js");

/*Chat.insertOne({
    from: "neha",
    to: "priya",
    message: "send me your exam sheet",
    created_at: new Date()
})
    .then((res) => { console.log(res) })
    .catch(err => console.log(err));*/

app.get("/", (req, res) => {
    res.send("home page");
});

//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    //console.log(chats);
    res.render("index.ejs", { chats });
});

//new chat route
app.get("/chats/new", (req, res) => {
    res.render("newChat.ejs");
});

//post chat
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    Chat.insertOne({
        from: from,
        to: to,
        message: msg,
        created_at: new Date()
    })
        .then(res => { console.log(res) })
        .catch(err => { console.log(err) });
    res.redirect("/chats");
});

//edit chat
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params
    console.log(id);
    let chat = await Chat.findById(id);
    console.log(chat);
    res.render("edit.ejs", { chat });
});

//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;
    let chat = await Chat.findByIdAndUpdate(id, { message: msg }, { runValidators: true, new: true });
    console.log(chat);
    res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findByIdAndDelete(id);
    console.log(chat);
    console.log("Deleted");
    res.redirect("/chats");
});

app.listen("3000", () => {
    console.log("server is listening on port:- 3000");
});