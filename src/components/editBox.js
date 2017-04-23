import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

class EditBox extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.addNewContent = this.addNewContent.bind(this);
  }

  onInputChange(event) {
    this.setState({ content: event.target.value });
    console.log(event.target.value);
  }

  addNewContent() {
    this.props.doneEditing(this.props.id, this.state.content);
  }

  render() {
    return (
      <div className="editBoxContainer">
        <Textarea className="editBoxItem" id="editBox" onChange={this.onInputChange} value={this.state.content} />
        <button className="editBoxItem" id="doneEditing" onClick={this.addNewContent}>
          Done Editing
        </button>
      </div>
    );
  }


}

export default EditBox;
