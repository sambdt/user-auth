import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddNote from './AddNote';
import NoteColumnHeader from './NoteColumnHeader';

const config = {
  method: 'get',
  url: 'http://dct-user-auth.herokuapp.com/api/notes/',
};

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    config.headers = {
      'x-auth': localStorage.getItem('token'),
    };

    axios(config)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  const updateNotes = (note) => {
    const noteArr = notes.slice();
    noteArr.unshift(note);
    setNotes(noteArr);
  };

  return (
    <div className="notes-container">

      <div className="notes-list">
        <NoteColumnHeader text="My Notes" />

        {
            notes.length ? (
              notes.map((note) => (
                // eslint-disable-next-line no-underscore-dangle
                <div key={note._id} className="note-card">
                  <h3>
                    {note.title}
                  </h3>
                  <div>
                    {note.body}
                  </div>
                  <div className="delete-button">
                    <button type="button">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div> No notes found add your first note </div>
            )
         }
      </div>

      <AddNote updateNotes={updateNotes} />
    </div>
  );
}

export default Notes;
