const router = require('express').Router();
let Note = require('../models/note.model');

router.route('/').get((req, res) => {
  Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const heading = req.body.heading; 
  const description = req.body.description;
  // const date = Date.parse(req.body.date);
  const _id = req.body._id;

  const newNote = new Note({
    heading,
    description,
    _id
  });

  newNote.save()
  .then(() => res.json('Note added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json('Note deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      note.heading = req.body.heading;
      note.description = req.body.description;
      const _id = req.body._id;
      // note.date = Date.parse(req.body.date);

      note.save()
        .then(() => res.json('Note updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;