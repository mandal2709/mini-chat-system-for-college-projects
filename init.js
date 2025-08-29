const mongoose = require("mongoose");
main()
    .then(() => { console.log("connection successfull") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');
}

const Chat = require("./models/chat.js");

let chats = [
    {
        from: "abhishek",
        to: "prachi",
        message: "Happy Birthday",
        created_at: new Date()
    },
    {
        from: "abhishek",
        to: "harshada",
        message: "Hows the exams was going",
        created_at: new Date()
    },
    {
        from: "abhishek",
        to: "shruti",
        message: "shall we go for hangout",
        created_at: new Date()
    },
    {
        from: "abhishek",
        to: "khushi",
        message: "when we go for a movie",
        created_at: new Date()
    },
    {
        from: "abhishek",
        to: "shraddha",
        message: "mera baccha will you eat me!",
        created_at: new Date()
    }
];

Chat.insertMany(chats);