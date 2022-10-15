/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  minWidth: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 1,
  px: 2,
  pb: 2,
};

const url = 'http://dct-user-auth.herokuapp.com/api/notes/';

const config = {
  method: 'delete',
};

function ModalWithContent({ isOpen, setIsOpen, children }) {
  return (
    <Modal
      hideBackdrop
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 200 }}>
        {children}
      </Box>
    </Modal>
  );
}

function Note({
  _id, title, body, deleteNote,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNoteDetailsOpen, setIsNoteDetailsOpen] = useState(false);

  const onDelete = () => {
    config.headers = {
      'x-auth': localStorage.getItem('token'),
    };
    config.url = url + _id;

    axios(config)
      .then((response) => {
        deleteNote(response.data._id);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const openNoteDetails = () => {
    setIsNoteDetailsOpen(true);
  };

  return (
    <div className="note-card" onClick={openNoteDetails}>
      <h3>
        {title}
      </h3>
      <div className="delete-button">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          Delete
        </button>
      </div>
      <ModalWithContent isOpen={isNoteDetailsOpen} setIsOpen={setIsNoteDetailsOpen}>
        <h3>
          {title}
        </h3>
        <div>
          {body}
        </div>
        <div className="delete-modal-buttons">
          <Button onClick={(e) => {
            e.stopPropagation();
            setIsNoteDetailsOpen(false);
          }}
          >
            Close
          </Button>
        </div>
      </ModalWithContent>
      <ModalWithContent isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 id="child-modal-title">Confirm</h2>
        <p id="child-modal-description">
          Do you really want to delete?
        </p>
        <div className="delete-modal-buttons">
          <Button onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          >
            Delete
          </Button>
          <Button onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          >
            Cancel
          </Button>
        </div>
      </ModalWithContent>
    </div>
  );
}

export default Note;
