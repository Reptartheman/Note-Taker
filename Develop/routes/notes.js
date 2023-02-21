const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const dbData = require('../db/db.json');
const fs = require('fs');



notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});


    notes.post('/', (req, res) => {
    readFromFile('./db/db.json', (err,data) => {
      if (err) throw err;
      const newData = JSON.parse(data);
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
      }
      newData.push(newNote);
      readAndAppend('./db/db.json', JSON.stringify(newData), (err) => {
        if (err) throw err;
      })
    })
  })