import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Immutable from 'immutable';
import ReactDOM from 'react-dom';
import TextBar from './components/textBar';
import Submit from './components/Submit';
import Note from './components/note';
import './style.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      currentTitleText: '',
      notes: Immutable.Map(),
    };

    this.createNote = this.createNote.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  createNote() {
    const newID = this.state.id + 1;
    let note = Note;
    note = note.set('title', this.state.currentTitleText);
    console.log(note.get('title'));
    this.setState({
      id: newID,
      notes: this.state.notes.set(newID, note),
    });
  }

  updateText(text) {
    this.setState({
      currentTitleText: text,
    });
  }

  render() {
    // console.log(this.state.notes);
    const Notes = this.state.notes.entrySeq().map(([id, note]) => {
      const title = note.get('title');
      const text = note.get('text');
      const noteStyle = {
        position: 'absolute',
        top: note.get('y'),
        left: note.get('x'),
        zIndex: note.get('zIndex'),
      };
      return (
        <Draggable>
          <div key={id} style={noteStyle} className="Note">
            <div>
              <h1 className="noteTitle">{title}</h1>
            </div>
            <div>
              <h3> {text} </h3>
            </div>
          </div>
        </Draggable>
      );
    });

    return (
      <div>
        <div className="noteCreationContainer">
          <TextBar updateText={this.updateText} />
          <Submit createNote={this.createNote} />
        </div>
        { Notes }
        <div />
      </div>
    );
  }

}


ReactDOM.render(<App />, document.getElementById('main'));
