const express = require('express');
const router = express.Router();
const { addNote, getNotes, getNote, editNote, removeNote } = require('../controllers/userController');

router.get('/notes', getNotes);
router.post('/notes', addNote);
router.get('/notes/:id', getNote);
router.put('/notes/:id', editNote);
router.delete('/notes/:id', removeNote);

module.exports = router;