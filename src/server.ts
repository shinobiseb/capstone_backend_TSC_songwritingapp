////////////////
//Dependencies 
////////////////
import express, {Request, Response} from "express"
import session from "express-session"
require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")

const MongoStore = require('connect-mongo');

const passport = require("./passport/setup")
const auth = require("./routes/auth")

const app = express()



//////////////////////////
// DATABASE CONNECTIONS
//////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("disconnected from mongo"))
.on("error", (error: unknown) => console.error)

///////////
// Model
///////////

const {Schema, model} = mongoose

const noteSchema = new Schema ({
    title: String,
    lyrics: String,
    chords: String,
})

const Note = model("Note", noteSchema)

/////////////////////////////////
//Middleware
//////////////////////////////////
app.use(cors()) // prevent cors errors, opens up access for frontend
app.use(morgan("dev")) //logging
app.use(express.json()) // parse json bodies
app.use(passport.initialize());
app.use(passport.session());


///////////////
// Routes
///////////////
//test
app.get("/", (req: Request, res: Response)  => {
    res.send("Five Nights at Freddy's: Security Breach has been released")
})

//Index Route
app.get("/notes", async (req, res) => {
  try {
    res.json(await Note.find({}));
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Create Route
app.post("/notes", async (req, res) => {
    try {
        res.json(await Note.create(req.body));
    } catch (error) {
        res.status(400).json({error});
    }
})

//Update Route
app.put("/notes/:id", async (req, res) => {
    try {
        // update a Note
        res.json(await Note.findByIdAndUpdate(req.params.id, req.body, {new: true}));
      } catch (error) {
        res.status(400).json({ error });
      }
})

//Delete Route
app.delete("/notes/:id", async (req, res) => {
    try {
        // delete a notes
        res.json(await Note.findByIdAndRemove(req.params.id));
      } catch (error) {
        res.status(400).json({ error });
      }
})


app.listen(3000, ()=> {
    console.log(`listening on port 3k`)
})