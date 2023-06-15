const notesCtrl = {};

const Note = require('../models/Note');

// GET NOTES
notesCtrl.getNotes = async (req, res) => {
   const notes = await Note.find();
   res.json(notes)
}

// CREATE NOTE
notesCtrl.createNote = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author,
    })
    await newNote.save();
    res.json({ message: 'Note saved' })
};

// GET NOTE
notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

// UPDATE NOTE
notesCtrl.updateNote = async (req, res) => {
    const { title, content, author } = req.body;
    await Note.findOneAndUpdate({_id: req.params.id}, {
        title,
        content,
        author
    });
    res.json({ message: 'Note updated' })
}

// DELETE NOTE
notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
}

module.exports = notesCtrl;