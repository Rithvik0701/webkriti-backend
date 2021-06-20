require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require("./routes/auth");
const feedbackRoutes = require("./routes/feedBack");
const booknowRoutes = require("./routes/booknow");
const client = require("./config/db");



app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

client.connect(() => {
    console.log("Databse Connected")
})


app.get("/", (req, res) => {
    res.status(200).send("Server is up and running!!");
});


app.use("/auth", authRoutes);
// app.use("/feedback", feedback);
app.use("/feedback", feedbackRoutes);

app.use("/booknow", booknowRoutes);







app.listen(port, () => {
    console.log("Server is Running");
});