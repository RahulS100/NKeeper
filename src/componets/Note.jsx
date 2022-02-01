import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';


function Note(props) {
    return (<div className="note-container"><h1 className="note-title">{props.title}</h1>
    <p className="note-content">{props.description}</p>
    <button onClick={() => {
        props.OnDelete(props.id);
    }} className="delete-note-btn"><DeleteIcon /></button>
    </div>);
}

export default Note;