const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const dbData = require('../db/db.json');
const fs = require('fs');


//this route retrieves all of the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});


notes.get('/:id', (req, res) => {
  for(let i = 0; i < dbData.length; i++){
    if(dbData[i].id == req.params.id){
     return res.json(dbData[i]);

    };
  };
});
  

// POST route for a new note
    notes.post('/', (req, res) => {
      console.log(req.body);

      const { title , text, } = req.body;

      if(req.body){
        const newNote ={
          title,
          text,
          note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json' );

        const jsonResponse = {
          status: 'success',
          body: 'YAY! You added a new note!'
        }

        res.json(jsonResponse);
      } else {
        res.error('Booooo no new note because of an error!');
      }
  });

  //delete note path
  notes.delete('/:id', (req,res) => {
    const id = req.params.id;


    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err){
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        const noteIndex = parsedData.findIndex(note => note.id == id);
        parsedData.splice(noteIndex, 1);
        writeToFile('./db/db.json', parsedData)
        res.send(`${id} has been erased.`)
      };
    });


  });

  module.exports = notes;