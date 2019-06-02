const express = require("express");
const mongoose = require("mongoose");
const UserImageSchema = require("./models/UserUrls");

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Data base connection
 var databaseUrl = "artWork";
 var collections = ["urlImages"];
 mongoose.connect("mongodb://localhost/artWork", { useNewUrlParser: true });

 var userID = "testID";

// Define API routes here

// This app.post route handles the image URL sent by browser and store them into the mongoose database by UserID. 
app.post("/api/user", function (req, res) {
  console.log("body:",req.body.url);

  UserImageSchema.findOneAndUpdate(
    {userId: userID},
    {$push: {imageUrls: [req.body.url]}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
        console.log("Model:",model);
    }
);
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {0
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
