const express = require('express');
const notesRouter = require('./notes');
const app = express();

//modular route for notes
app.use('/notes', notesRouter);

module.exports = app;