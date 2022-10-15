import React from 'react';

function Note({ _id, title, body }) {
  return (
    <div key={_id} className="note-card">
      <h3>
        {title}
      </h3>
      <div>
        {body}
      </div>
      <div className="delete-button">
        <button type="button">Delete</button>
      </div>
    </div>
  );
}

export default Note;
