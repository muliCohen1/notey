const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let Note = require('./models/note.model');
const mailer = require("./email-sender");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
    Note.find({}).then(notes => {
        // console.log(notes)
        sendEmail(notes);
        
    })
    .catch(err => console.log(err))
});

function sendEmail(notes) {
        mailer(notes);
}

const notesRouter = require('./routes/notes');

app.use('/notes', notesRouter);

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});
