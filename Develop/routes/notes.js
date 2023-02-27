const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');


//this route retrieves all of the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
  

// POST route for a new note
    notes.post('/', (req, res) => {

      const { title , text, } = req.body;

      if(req.body){
        const newNote ={
          title,
          text,
          id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json' );

        res.json('Note created!');
      } else {
        res.error('Error creating note');
      }
  });

  //delete note path
  notes.delete('/:id', (req,res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data)) 
    .then((notes) => {
      console.log(res.json);
      let previousNotes = notes.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', previousNotes);
      res.json('Note deleted!');
    });

  });

  module.exports = notes;