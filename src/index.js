import React, { Component } from 'react';
import marked from 'marked';
import Draggable from 'react-draggable';
import Immutable from 'immutable';
import ReactDOM from 'react-dom';
import TextBar from './components/textBar';
import Submit from './components/Submit';
import Note from './components/note';
import EditBox from './components/editBox';
import './style.scss';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onStartDrag","onStopDrag","onDrag"] }] */

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      currentTitleText: '',
      notes: Immutable.Map(),
      isEditing: false,
    };

    this.onStopDrag = this.onStopDrag.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.createNote = this.createNote.bind(this);
    this.updateText = this.updateText.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  /* Dragging callback methods*/
  onStartDrag(e, ui) {
    console.log('just started draggin');
  }

  onStopDrag(e, ui) {
    console.log(e);
    console.log(ui);
    const id = Number(ui.node.accessKey);
    let note = this.state.notes.get(id);
    note = note.set('x', Number(ui.x));
    note = note.set('y', Number(ui.y));

    this.setState({
      notes: this.state.notes.set(id, note),
    });
  }

  onDrag(e, ui) {
    console.log('draggin now');
  }

  onDeleteClick(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  startEditing(id) {
    this.setState({
      isEditing: true,
      notes: this.state.notes.update(id, (note) => { return note.set('isBeingEdited', true); }),
    });
  }

  createNote() {
    const newID = this.state.id + 1;
    let note = Note;
    note = note.set('title', this.state.currentTitleText);
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

  doneEditing(id, content) {
    let updatedNote = this.state.notes.get(id);
    updatedNote = updatedNote.set('text', content);
    updatedNote = updatedNote.set('isBeingEdited', false);

    this.setState({
      isEditing: false,
      notes: this.state.notes.update(id, (note) => { return updatedNote; }),
    });
  }

  renderContent(id) {
    if (this.state.notes.get(id).get('isBeingEdited')) {
      return <EditBox doneEditing={this.doneEditing} id={id} />;
    } else {
      /*eslint-disable*/
      return <div dangerouslySetInnerHTML={{ __html: marked(this.state.notes.get(id).get('text') || '') }} />;
      /*eslint-enable*/
    }
  }


  render() {
    // console.log(this.state.notes);
    const Notes = this.state.notes.entrySeq().map(([id, note]) => {
      const title = note.get('title');
      const noteStyle = {
        position: 'absolute',
        top: note.get('y'),
        left: note.get('x'),
        zIndex: note.get('zIndex'),
      };
      /*eslint-disable */
      return (
        <Draggable
          onStart={this.onStartDrag}
          onDrag={this.onDrag}
          onStop={this.onStopDrag}
        >
          <div accessKey={id} key={id} style={noteStyle} className="Note">
            <div className="titleBarContainer">
              <h1 className="titleBarItem noteTitle">{title}</h1>
              <div className="titleBarItem">
                <i onClick={() => this.onDeleteClick(id)} id="delete" className="fa fa-trash-o" />
                <i onClick={() => this.startEditing(id)} id="edit" className="fa fa-pencil" />
                <i id="drag" className="fa fa-arrows-alt" />
              </div>
            </div>
            <div className="contentArea">
              {this.renderContent(id)}
            </div>
          </div>
        </Draggable>
      );
      /*eslint-enable*/
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
