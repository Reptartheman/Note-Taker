const express = require('express');
const uuid = require('./helpers/uuid');
const dbData = require('./db/db.json');
const app = express();
const PORT = 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });

app.get('/api/notes', (req, res) => res.json(dbData));

app.post()



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });