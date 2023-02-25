const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const dbData = require('../db/db.json');




notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});


    notes.post('/', (req, res) => {
      console.log(req.body);

      const {title , text, note_id} = req.body;

      if(req.body){
        const newNote ={
          title,
          text,
          note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json' );
        res.json('YAY! You added a new note!')
      } else {
        res.error('Booooo no new note because of an error!');
      }
  });

  module.exports = notes;