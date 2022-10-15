import axios from 'axios';
import React, { useState } from 'react';
import NoteColumnHeader from './NoteColumnHeader';

const config = {
  method: 'post',
  url: 'http://dct-user-auth.herokuapp.com/api/notes/',
};

function AddNote({ updateNotes }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;

    if (e.target.name === 'title') {
      setTitle(input);
    } else if (e.target.name === 'body') {
      setBody(input);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    config.headers = {
      'x-auth': localStorage.getItem('token'),
      'Content-Type': 'application/json',
    };

    config.data = {
      title,
      body,
    };

    axios(config)
      .then((response) => {
        updateNotes(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  return (
    <div className="add-note">
      <NoteColumnHeader text="Add Note" />

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            placeholder="Title"
            value={title}
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="input-field">
          <textarea
            placeholder="Body"
            value={body}
            name="body"
            onChange={handleChange}
            cols={20}
            rows={8}
          />
        </div>

        <div className="input-field">
          <input
            type="submit"
            value="save"
          />
        </div>
      </form>
    </div>
  );
}

export default AddNote;
