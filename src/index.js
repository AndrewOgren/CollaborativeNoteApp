import React, { Component } from 'react';
import marked from 'marked';
import Draggable from 'react-draggable';
import Immutable from 'immutable';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
// import * as firebasedb from './firebasedb';
import TextBar from './components/textBar';
import Submit from './components/Submit';
import Note from './components/note';
import EditBox from './components/editBox';
import './style.scss';

const socketserver = 'http://localhost:9090';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleDrag"] }] */

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTitleText: '',
      currentlyClickedID: null,
      notes: Immutable.Map(),
      isEditing: false,
    };

    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });

    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.createNote = this.createNote.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    this.socket.on('notes', (notes) => {
      console.log(notes);
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  /* Dragging callback methods*/
  handleDrag(e, ui) {
    this.socket.emit('updateNote', ui.node.id, { x: ui.x, y: ui.y });
  }

  /* Note functionality */

  createNote() {
    let note = Note;
    note = note.set('title', this.state.currentTitleText);
    console.log(note);
    this.socket.emit('createNote', JSON.parse(JSON.stringify(note)));
  }

  updateText(text) {
    this.setState({
      currentTitleText: text,
    });
  }

  // handleClick(id) {
  //   const oldNoteInFront = this.state.currentlyClickedID;
  //   if (oldNoteInFront !== id) {
  //     this.setState({
  //       currentlyClickedID: id,
  //     });
  //     // firebasedb.bringNoteToFront(id, oldNoteInFront);
  //   }
  // }

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
      const noteStyle = {
        position: 'absolute',
        zIndex: note.zIndex,
      };

      // Returns the note with all of its information
      return (

        <Draggable key={id}
          handle=".draggedItem"
          onDrag={this.handleDrag}
          position={{ x: note.x, y: note.y }}
        >
          <div id={id} key={id} style={noteStyle} className="Note">
            <div className="titleBarContainer">
              <h1 className="titleBarItem noteTitle">{title}</h1>
              <div className="titleBarItem">
                <i onClick={() => this.socket.emit('deleteNote', id)} id="delete" className="fa fa-trash-o" />
                <i onClick={() => this.socket.emit('updateNote', id, { isBeingEdited: true })} id="edit" className="fa fa-pencil" />
                <i onClick={() => this.handleClick(id)} id="drag" className="fa fa-arrows-alt draggedItem" />
              </div>
            </div>
            <div className="contentArea">
              {this.renderContent(id)}
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
