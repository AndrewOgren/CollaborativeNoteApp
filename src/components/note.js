import Immutable from 'immutable';

const Note = Immutable.Map({
  isBeingEdited: false,
  title: 'title',
  text: 'Click Edit Icon To Add Text',
  x: 100,
  y: 100,
  zIndex: 1,
});

export default Note;
