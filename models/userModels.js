const Note = require('../schema/User');

const createNote = async (data) => await Note.create(data);
const getAllNotes = async () => await Note.findAll({ order: [['tanggal_dibuat', 'DESC']] });
const getNoteById = async (id) => await Note.findByPk(id);
const updateNote = async (id, data) => await Note.update(data, { where: { id } });
const deleteNote = async (id) => await Note.destroy({ where: { id } });

module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote };