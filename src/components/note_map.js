import React, { Component } from 'react';
import Note from './note';

class NoteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
  }

  // { if (props.id > this.state.id){
  //   this.setState({
  //     id: props.id,
  //   });
  //   const note = <Note title=props.title />;
  //   const notes = props.notes.set(props.id, note);
  // }
  //
  // notes.entrySeq().map(([id, note]) => {
  // // perhaps you might return some jsx here :-)
  // // <Note id={id} note={note} ... for instance maybe
  // });}

  render() {
    return (
      <Note />
    );
  }

}

export default NoteMap;
