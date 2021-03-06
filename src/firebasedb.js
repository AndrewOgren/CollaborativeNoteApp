import firebase from 'firebase';


// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAMCcu2u6lunUsF5DLG4gjOBOtdUscOKr4',
  authDomain: 'notes-47a47.firebaseapp.com',
  databaseURL: 'https://notes-47a47.firebaseio.com',
  projectId: 'notes-47a47',
  storageBucket: 'notes-47a47.appspot.com',
  messagingSenderId: '993194921801',
};

/* Methods for updating firebase with changes  */
firebase.initializeApp(config);
const database = firebase.database();

function addNote(note) {
  database.ref('notes').push(note);
}

function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

function isEditing(id) {
  database.ref('notes').child(id).update({ isBeingEdited: true });
}

function updatePosition(xPos, yPos, id) {
  database.ref('notes').child(id).update({ x: xPos, y: yPos });
}

function bringNoteToFront(id, oldNoteInFront) {
  let oldNoteStillExists = false;
  database.ref('notes').child(id).update({ zIndex: 100 });
  firebase.database().ref('notes').on('value', (snapshot) => {
    oldNoteStillExists = snapshot.hasChild(String(oldNoteInFront));
  });

  if (oldNoteInFront != null && oldNoteStillExists) {
    console.log('somehow updated old note');
    console.log(oldNoteInFront);
    database.ref('notes').child(oldNoteInFront).update({ zIndex: 1 });
  }
}

function doneEditing(id, content) {
  database.ref('notes').child(id).update({ text: content, isBeingEdited: false });
}

function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

/* eslint-disable */
export { fetchNotes, database, addNote, deleteNote, updatePosition, isEditing, doneEditing, bringNoteToFront };
/* eslint-enable */
