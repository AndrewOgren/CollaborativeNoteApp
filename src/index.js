import React, { Component } from 'react';
import marked from 'marked';
import Draggable from 'react-draggable';
import Immutable from 'immutable';
import ReactDOM from 'react-dom';
import * as firebasedb from './firebasedb';
import TextBar from './components/textBar';
import Submit from './components/Submit';
import Note from './components/note';
import EditBox from './components/editBox';
import './style.scss';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleDrag"] }] */

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTitleText: '',
      notes: Immutable.Map(),
      isEditing: false,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.createNote = this.createNote.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      console.log(notes);
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  /* Dragging callback methods*/
  handleDrag(e, ui) {
    firebasedb.updatePosition(ui.x, ui.y, ui.node.id);
  }

  /* Note functionality */

  createNote() {
    let note = Note;
    note = note.set('title', this.state.currentTitleText);
    console.log(note);
    firebasedb.addNote(JSON.parse(JSON.stringify(note)));
  }

  updateText(text) {
    this.setState({
      currentTitleText: text,
    });
  }

  renderContent(id) {
    // When it's being edited, display edit box
    if (this.state.notes.get(id).isBeingEdited) {
      return <EditBox id={id} />;
    } else {
      /*eslint-disable*/
      return <div dangerouslySetInnerHTML={{ __html: marked(this.state.notes.get(id).text || '') }} />;
      /*eslint-enable*/
    }
  }


  render() {
    const Notes = this.state.notes.entrySeq().map(([id, note]) => {
      const title = note.title;
      console.log(note.x);
      console.log(note.y);

      const noteStyle = {
        position: 'absolute',
        zIndex: note.zIndex,
      };

      // Returns the note with all of its information
      return (
        /* eslint-disable */
        <Draggable key={id}
          handle=".draggedItem"
          onDrag={this.handleDrag}
          position={{x: note.x, y: note.y}}
        >
          <div id={id} key={id} style={noteStyle} className="Note">
            <div className="titleBarContainer">
              <h1 className="titleBarItem noteTitle">{title}</h1>
              <div className="titleBarItem">
                <i onClick={() => firebasedb.deleteNote(id)} id="delete" className="fa fa-trash-o" />
                <i onClick={() => firebasedb.isEditing(id)} id="edit" className="fa fa-pencil" />
                <i id="drag" className="fa fa-arrows-alt draggedItem" />
              </div>
            </div>
            <div className="contentArea">
              {this.renderContent(id)}
            </div>
          </div>
        </Draggable>
      );
      /* eslint-enable*/
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
