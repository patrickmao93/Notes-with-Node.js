const fs = require("fs");

const fetchNotes = () => {
  let notes = [];
  try {
    const noteString = fs.readFileSync("notes-data.json");
    notes = JSON.parse(noteString);
  } catch (e) {
    console.log(e);
  }
  return notes;
};

const saveNotes = notes => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

const addNote = (title, body) => {
  const note = { title, body };
  const notes = fetchNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  const notes = fetchNotes();
  return notes;
};

const getNote = title => {
  const notes = fetchNotes();
  return notes.find(note => note.title === title);
};

const removeNote = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  if (notes.length !== filteredNotes.length) {
    saveNotes(filteredNotes);
    return true;
  } else {
    return false;
  }
};

const logNote = note => {
  console.log("------------------------------------------------------------");
  if (!note) {
    console.log("Note not found");
  } else {
    console.log("Note title: ", note.title);
    console.log("Note content: ", note.body);
  }
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
