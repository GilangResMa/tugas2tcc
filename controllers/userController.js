const { createNote, getAllNotes, getNoteById, updateNote, deleteNote } = require('../models/userModels');

const addNote = async (req, res) => {
  try {
    const { judul, isi } = req.body;
    const note = await createNote({ judul, isi });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await getAllNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNote = async (req, res) => {
  try {
    const note = await getNoteById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Catatan tidak ditemukan' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editNote = async (req, res) => {
  try {
    const { judul, isi } = req.body;
    const [updated] = await updateNote(req.params.id, { judul, isi });
    if (updated) {
      const note = await getNoteById(req.params.id);
      res.json(note);
    } else {
      res.status(404).json({ message: 'Catatan tidak ditemukan' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeNote = async (req, res) => {
  try {
    const deleted = await deleteNote(req.params.id);
    if (deleted) res.json({ message: 'Catatan berhasil dihapus' });
    else res.status(404).json({ message: 'Catatan tidak ditemukan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addNote, getNotes, getNote, editNote, removeNote };