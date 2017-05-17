import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import io from 'socket.io-client';
// import * as firebasedb from '../firebasedb';
/* The Content that is displayed when editing */
const socketserver = 'http://localhost:9090';

class EditBox extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.addNewContent = this.addNewContent.bind(this);

    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  onInputChange(event) {
    this.setState({ content: event.target.value });
  }

  addNewContent() {
    // firebasedb.doneEditing(this.props.id, this.state.content);
    console.log(this.state.content);
    this.socket.emit('updateNote', this.props.id, { text: this.state.content, isBeingEdited: false });
  }

  render() {
    return (
      <div className="editBoxContainer">
        <Textarea rows="10" cols="20" className="editBoxItem" id="editBox" onChange={this.onInputChange} value={this.state.content} />
        <button className="editBoxItem" id="doneEditing" onClick={this.addNewContent}>
          Done Editing
        </button>
      </div>
    );
  }


}

export default EditBox;
