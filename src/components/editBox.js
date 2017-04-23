import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import * as firebasedb from '../firebasedb';

class EditBox extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.addNewContent = this.addNewContent.bind(this);
  }

  onInputChange(event) {
    this.setState({ content: event.target.value });
  }

  addNewContent() {
    firebasedb.doneEditing(this.props.id, this.state.content);
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
