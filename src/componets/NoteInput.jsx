import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function NoteInput(props) {

    let [isAniamtion, setAnimation] = React.useState(false);
    let [note, setNote] = React.useState({title: "", content: ""});


    function noteInputHandle(evn) {
        let {name, value} = evn.target;
            setNote((prev) => {
                if(name === 'title') return {title: value, content: prev.content}
                else if(name === 'content') return {title: prev.title, content: value}
            });
    }


    function animationToogle() {
        setAnimation(true);
    }


    return (
     <div className="note-input">
        <form onSubmit={(evn) => {
            evn.preventDefault();
            props.onSubmitNote(note);
            setNote({title: "", content: ""});
        }}>
        {isAniamtion &&
         <input name="title" type="text" onChange={noteInputHandle} value={note.title} className="input" placeholder="Note Title"/>}
         <textarea name="content" type="text" onChange={noteInputHandle} value={note.content} className="input" placeholder="Type you note..." rows={isAniamtion ? 2 : 1} onClick={animationToogle}></textarea>
         <div className="submit-btn-container">
         { isAniamtion &&
         <Zoom in={isAniamtion}>
         <Fab type="submit" className="note-add-btn"><AddIcon /></Fab> 
         </Zoom>}
         </div>
         </form>
     </div>   
    );
}

export default NoteInput;