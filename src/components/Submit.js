import React, { Component } from 'react';


class Submit extends Component {

  constructor(props) {
    super(props);
    this.state = { nothing: '' };
    this.beginCreationOfNote = this.beginCreationOfNote.bind(this);
  }

  beginCreationOfNote() {
    this.props.createNote();
  }

  render() {
    return (
      <button id="createNoteButton" onClick={this.beginCreationOfNote}>
        Create Note
      </button>
    );
  }


}

export default Submit;
