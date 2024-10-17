import express from "express";
import axios from 'axios';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://restcountries.com/v3.1";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.post("/", async (req,res)=>{
    var country = req.body.country;
    console.log(country);
    try {
        const request = await axios.get(API_URL + "/name/" + country);
        const data = request.data[0];
        res.render("index.ejs", { content: data});
    } catch (error) {
        res.render("index.ejs", { error: error});
    }

});

app.listen(port, ()=>{
    console.log("Listening on port 3000");
});