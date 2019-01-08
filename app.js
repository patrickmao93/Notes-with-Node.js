const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

const titleConfig = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};

const bodyConfig = {
  describe: "Content of note",
  demand: true,
  alias: "b"
};

const argv = yargs
  .command("add", "Add a new note", {
    title: titleConfig,
    body: bodyConfig
  })
  .command("list", "List all notes")
  .command("read", "Read a note", {
    title: titleConfig
  })
  .command("remove", "Remove a note", {
    title: titleConfig
  })
  .help().argv;
const command = argv._[0];

if (command === "add") {
  const note = notes.addNote(argv.title, argv.body);
  notes.logNote(note);
} else if (command === "list") {
  const allNotes = notes.getAll();
  allNotes.forEach(note => notes.logNote(note));
} else if (command === "read") {
  const note = notes.getNote(argv.title);
  notes.logNote(note);
} else if (command === "remove") {
  const removed = notes.removeNote(argv.title);
  notes.logNote(removed);
} else {
  console.log("Command not recognized");
}
